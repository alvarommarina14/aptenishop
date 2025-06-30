import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createVariantsSchema } from "@/lib/validations/variantSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createVariantsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const variants = await prisma.variant.createMany({
      data: result.data,
      skipDuplicates: true,
    });

    return NextResponse.json(variants, { status: 201 });
  } catch (error) {
    console.error("Error creating variants:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
