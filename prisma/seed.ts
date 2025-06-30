import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      name: "Raqueta Wilson Pro Staff X V14",
      description: "Raqueta profesional para jugadores avanzados, con excelente control, estabilidad y precisión.",
      productType: "Raqueta",
      brand: "Wilson",
    },
  });

  const colorAttr = await prisma.attribute.create({
    data: {
      name: "Color",
      attributeValues: {
        create: [{ value: "Negro" }, { value: "Rojo" }],
      },
    },
  });

  const pesoAttr = await prisma.attribute.create({
    data: {
      name: "Peso",
      attributeValues: {
        create: [{ value: "300g" }, { value: "310g" }],
      },
    },
  });

  await prisma.productAttribute.createMany({
    data: [
      { productId: product.id, attributeId: colorAttr.id },
      { productId: product.id, attributeId: pesoAttr.id },
    ],
  });

  const negroValue = await prisma.attributeValue.findFirstOrThrow({
    where: { value: "Negro", attributeId: colorAttr.id },
  });
  const rojoValue = await prisma.attributeValue.findFirstOrThrow({
    where: { value: "Rojo", attributeId: colorAttr.id },
  });
  const peso300gValue = await prisma.attributeValue.findFirstOrThrow({
    where: { value: "300g", attributeId: pesoAttr.id },
  });
  const peso310gValue = await prisma.attributeValue.findFirstOrThrow({
    where: { value: "310g", attributeId: pesoAttr.id },
  });

  const varianteNegro300 = await prisma.variant.create({
    data: {
      sku: "WPSX-V14-NEGRO-300",
      price: 259.99,
      stock: 6,
      productId: product.id,
      variantValues: {
        create: [{ attributeValueId: negroValue.id }, { attributeValueId: peso300gValue.id }],
      },
    },
  });

  const varianteRojo310 = await prisma.variant.create({
    data: {
      sku: "WPSX-V14-ROJO-310",
      price: 269.99,
      stock: 4,
      productId: product.id,
      variantValues: {
        create: [{ attributeValueId: rojoValue.id }, { attributeValueId: peso310gValue.id }],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
