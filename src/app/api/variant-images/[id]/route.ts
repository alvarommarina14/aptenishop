import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

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

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.variantImage.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Imagen eliminada" });
  } catch (error) {
    console.error("Error deleting variant image:", error);
    return NextResponse.json({ message: "Error deleting variant image" }, { status: 500 });
  }
}
