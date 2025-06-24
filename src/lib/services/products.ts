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
