import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GetProductById } from "@/lib/services/products";
import { updateProductSchema } from "@/lib/validations/productSchema";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await GetProductById(parseInt(params.id));

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
    const body = await req.json();
    const result = updateProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }

    const id = parseInt(params.id);

    const updated = await prisma.product.update({
      where: { id },
      data: result.data,
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
