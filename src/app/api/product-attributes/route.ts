import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createProductAttributeSchema } from "@/lib/validations/productAttributesSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createProductAttributeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const created = await prisma.productAttribute.create({ data: result.data });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating product attributes:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : error },
      { status: 500 },
    );
  }
}
