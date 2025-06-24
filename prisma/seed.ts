import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  const colorAttr = await prisma.attribute.create({
    data: { name: "Color" },
  });

  const pesoAttr = await prisma.attribute.create({
    data: { name: "Peso" },
  });

  const packAttr = await prisma.attribute.create({
    data: { name: "Tamaño del pack" },
  });

  await prisma.product.create({
    data: {
      name: "Wilson Pro Staff X V14",
      description: "Raqueta profesional para jugadores avanzados, con excelente control y estabilidad.",
      productType: "Raqueta",
      variants: {
        create: [
          {
            sku: "WPSX-V14-NR-315",
            price: 279.99,
            stock: 10,
            attributes: {
              create: [
                { value: "Dorado", attributeId: colorAttr.id },
                { value: "315g", attributeId: pesoAttr.id },
              ],
            },
            images: {
              create: [{ url: "https://images.fravega.com/f500/5bdc89dd70afda7aa99738f2223ef774.jpg" }],
            },
          },
          {
            sku: "WPSX-V14-BD-300",
            price: 279.99,
            stock: 5,
            attributes: {
              create: [
                { value: "Negro", attributeId: colorAttr.id },
                { value: "300g", attributeId: pesoAttr.id },
              ],
            },
            images: {
              create: [
                {
                  url: "https://production.cdn.vaypol.com/variants/xxxzksru0eahznppd7j23jhreche/e82c8d6171dd25bb538f2e7263b5bc7dfc6a79352d85923074be76df53fbc6f4",
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Pelotas Wilson US Open Extra Duty",
      description: "Pelotas oficiales del US Open. Rendimiento y durabilidad en canchas duras.",
      productType: "Pelota",
      variants: {
        create: [
          {
            sku: "WUSOPEN-XD-3PK",
            price: 8.99,
            stock: 100,
            attributes: {
              create: [{ value: "Pack de 3", attributeId: packAttr.id }],
            },
            images: {
              create: [
                {
                  url: "https://www.wilsonstore.com.ar/cdn/shop/products/2a15448b-8bfa-4e5f-97a4-d8f08ebd7cb3.jpg?v=1692196758",
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
