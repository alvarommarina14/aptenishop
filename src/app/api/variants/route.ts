import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { createVariantSchema } from "@/lib/validations/variantSchema";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createVariantSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const variant = await prisma.variant.create({ data: result.data });
    return NextResponse.json(variant, { status: 201 });
  } catch (error) {
    console.error("Error fetching variant:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
