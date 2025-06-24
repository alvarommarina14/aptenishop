import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { GetAllProducts } from "@/lib/services/products";
import { createProductSchema } from "@/lib/validations/productSchema";

export async function GET() {
  try {
    const products = await GetAllProducts();
    if (!products) {
      return NextResponse.json({ message: "No hay productos" }, { status: 404 });
    }
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 400 });
    }
    const product = await prisma.product.create({ data: result.data });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
