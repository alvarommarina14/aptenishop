import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const images = await prisma.variantImage.createMany({
      data: body,
    });
    return NextResponse.json(images, { status: 201 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
