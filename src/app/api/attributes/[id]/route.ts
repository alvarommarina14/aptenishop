import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    const attribute = await prisma.attribute.findUnique({
      where: { id },
    });

    if (!attribute) {
      return NextResponse.json({ message: "Atributo no encontrado" }, { status: 404 });
    }
    return NextResponse.json(attribute);
  } catch (error) {
    console.error("Error fetching attribute:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    const id = parseInt(params.id);

    const updated = await prisma.attribute.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating attribute:", error);
    return NextResponse.json({ message: "Error updating attribute" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.attribute.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Atributo eliminado" });
  } catch (error) {
    console.error("Error deleting attribute:", error);
    return NextResponse.json({ message: "Error deleting attribute" }, { status: 500 });
  }
}
