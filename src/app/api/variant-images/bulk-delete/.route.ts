import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No IDs provided" }, { status: 400 });
    }

    await prisma.variantImage.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ message: "Images removed succesfully" });
  } catch (error) {
    console.error("Error deleting variant images:", error);
    return NextResponse.json({ message: "Error deleting variant images" }, { status: 500 });
  }
}
