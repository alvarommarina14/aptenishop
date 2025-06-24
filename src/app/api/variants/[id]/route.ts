import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    const variant = await prisma.variant.findUnique({
      where: { id },
      include: {
        images: true,
        attributes: {
          include: {
            attribute: true,
          },
        },
      },
    });

    if (!variant) {
      return NextResponse.json({ message: "Variante no encontrada" }, { status: 404 });
    }
    return NextResponse.json(variant);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    const id = parseInt(params.id);

    const updated = await prisma.variant.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating variant:", error);
    return NextResponse.json({ message: "Error updating variant" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.variant.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Variante eliminada" });
  } catch (error) {
    console.error("Error deleting variant:", error);
    return NextResponse.json({ message: "Error deleting variant" }, { status: 500 });
  }
}
