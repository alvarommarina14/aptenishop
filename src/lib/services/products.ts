import { prisma } from "@/lib/prisma";

export async function GetAllProducts() {
  return prisma.product.findMany({
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
}

export async function GetProductById(id: number) {
  return prisma.product.findUnique({
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
}
