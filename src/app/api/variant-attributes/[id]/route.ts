import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    const id = parseInt(params.id);

    const updated = await prisma.variantAttribute.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating variant attribute:", error);
    return NextResponse.json({ message: "Error updating variant attribute" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.variantAttribute.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Atributo eliminada" });
  } catch (error) {
    console.error("Error deleting variant attribute:", error);
    return NextResponse.json({ message: "Error deleting variant attribute" }, { status: 500 });
  }
}
