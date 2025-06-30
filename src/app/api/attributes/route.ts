import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAttributeSchema } from "@/lib/validations/attributeSchema";

export async function GET() {
  try {
    const attribute = await prisma.attribute.findMany({
      include: {
        attributeValues: true,
      },
    });
    if (!attribute) {
      return NextResponse.json({ message: "Attributes not found" }, { status: 404 });
    }
    return NextResponse.json(attribute);
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createAttributeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }
    const attribute = await prisma.attribute.create({ data: result.data });
    return NextResponse.json(attribute, { status: 201 });
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
