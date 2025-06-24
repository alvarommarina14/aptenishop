import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const variant = await prisma.variant.create({ data });
    return NextResponse.json(variant, { status: 201 });
  } catch (error) {
    console.error("Error fetching variant:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
