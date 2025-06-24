import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            images: true,
            attributes: {
              include: {
                attribute: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();

    const id = parseInt(params.id);

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Error updating product" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Error deleting product" }, { status: 500 });
  }
}
