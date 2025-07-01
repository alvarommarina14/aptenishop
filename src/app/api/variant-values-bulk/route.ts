import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

import { createAttributeSchema } from "@/lib/validations/attributeSchema";
import { createAttributeValueSchema } from "@/lib/validations/attributeValueSchema";
import { createProductAttributeSchema } from "@/lib/validations/productAttributesSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, values, productId } = body;

    const resultAttribute = createAttributeSchema.safeParse({ name: name });

    if (!resultAttribute.success) {
      return NextResponse.json({ errors: resultAttribute.error.flatten().fieldErrors }, { status: 400 });
    }
    const resultAttributeValues = createAttributeValueSchema.safeParse({
      values,
    });
    if (!resultAttributeValues.success) {
      return NextResponse.json({ errors: resultAttributeValues.error.flatten().fieldErrors }, { status: 400 });
    }

    const resultProductAttribute = createProductAttributeSchema.safeParse({
      productId,
    });
    if (!resultProductAttribute.success) {
      return NextResponse.json({ errors: resultProductAttribute.error.flatten().fieldErrors }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      const newAttribute = await tx.attribute.create({
        data: { name: resultAttribute.data.name },
      });

      const createdValues = await Promise.all(
        values.map((v: { value: string }) =>
          tx.attributeValue.create({
            data: {
              value: v.value,
              attributeId: newAttribute.id,
            },
          }),
        ),
      );

      await tx.productAttribute.create({
        data: {
          productId,
          attributeId: newAttribute.id,
        },
      });

      await Promise.all(
        createdValues.map((attrValue) =>
          tx.variant.create({
            data: {
              productId,
              variantValues: {
                create: [{ attributeValueId: attrValue.id }],
              },
            },
          }),
        ),
      );
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    console.error("Error creating product attributes:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
}
