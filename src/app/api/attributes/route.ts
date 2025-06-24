import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const attribute = await prisma.attribute.findMany();
    if (!attribute) {
      return NextResponse.json({ message: "No hay atributos" }, { status: 404 });
    }
    return NextResponse.json(attribute);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const product = await prisma.product.create({ data });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
