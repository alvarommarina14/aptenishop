import { prisma } from '@/lib/prisma';

export async function GetAllProducts() {
    return prisma.product.findMany({
        include: {
            productAttributes: {
                include: {
                    attribute: true,
                },
            },
            variants: {
                include: {
                    images: true,
                    variantValues: {
                        include: {
                            attributeValue: {
                                include: {
                                    attribute: true,
                                },
                            },
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
            productAttributes: {
                include: {
                    attribute: true,
                },
            },
            variants: {
                include: {
                    images: true,
                    variantValues: {
                        include: {
                            attributeValue: {
                                include: {
                                    attribute: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
}
