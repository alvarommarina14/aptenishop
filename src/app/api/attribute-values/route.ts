import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAttributeValueSchema } from "@/lib/validations/attributeValueSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createAttributeValueSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }
    const attributes = await prisma.attributeValue.createMany({ data: result.data });
    return NextResponse.json(attributes, { status: 201 });
  } catch (error) {
    console.error("Error fetching attribute values:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
