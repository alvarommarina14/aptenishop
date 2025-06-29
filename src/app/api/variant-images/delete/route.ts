import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const images = await req.json();

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ message: "No images provided" }, { status: 400 });
    }

    const deleteResults = await Promise.all(
      images.map(({ publicId }: { publicId: string }) => cloudinary.uploader.destroy(publicId)),
    );

    const idsToDelete = images.map((img: { id: number }) => img.id);
    await prisma.variantImage.deleteMany({
      where: {
        id: { in: idsToDelete },
      },
    });

    return NextResponse.json({
      message: "Images deleted from Cloudinary and DB",
      results: deleteResults,
    });
  } catch (error) {
    console.error("Error deleting images:", error);
    return NextResponse.json({ message: "Failed to delete images" }, { status: 500 });
  }
}
