import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    await prisma.productAttribute.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product attribute deleted" });
  } catch (error) {
    console.error("Error deleting product attribute:", error);
    return NextResponse.json({ message: "Error deleting product attribute" }, { status: 500 });
  }
}
