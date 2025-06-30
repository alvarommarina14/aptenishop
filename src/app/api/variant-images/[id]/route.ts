import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    const id = parseInt(params.id);

    const updated = await prisma.variantImage.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating variant image:", error);
    return NextResponse.json({ message: "Error updating variant image" }, { status: 500 });
  }
}
