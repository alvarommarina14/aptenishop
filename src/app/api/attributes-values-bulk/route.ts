import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

import { createAttributeValueSchema } from "@/lib/validations/attributeValueSchema";
import { createProductAttributeSchema } from "@/lib/validations/productAttributesSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, values, productId } = body;

    const resultProductAttribute = createProductAttributeSchema.safeParse({
      name,
      productId,
    });

    if (!resultProductAttribute.success) {
      return NextResponse.json({ errors: resultProductAttribute.error.flatten().fieldErrors }, { status: 400 });
    }

    const resultAttributeValues = createAttributeValueSchema.safeParse({
      values,
    });
    if (!resultAttributeValues.success) {
      return NextResponse.json({ errors: resultAttributeValues.error.flatten().fieldErrors }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      const newProductAttribute = await tx.productAttribute.create({ data: resultProductAttribute.data });
      await Promise.all(
        resultAttributeValues.data.values.map((v) =>
          tx.attributeValue.create({
            data: {
              value: v.value,
              productAttributeId: newProductAttribute.id,
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
