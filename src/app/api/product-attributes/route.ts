import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createProductAttributeSchema } from "@/lib/validations/productValueSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createProductAttributeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const { productId, attributeIds } = result.data;

    const data = attributeIds.map((attributeId) => ({
      productId,
      attributeId,
    }));

    const created = await prisma.productAttribute.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating product attributes:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
