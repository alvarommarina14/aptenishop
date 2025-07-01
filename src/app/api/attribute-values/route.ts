import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAttributeValuesSchema } from "@/lib/validations/attributeValueSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createAttributeValuesSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    await prisma.attributeValue.createMany({
      data: result.data,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: "Attribute values created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating attribute values:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
