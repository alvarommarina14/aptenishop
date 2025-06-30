import { z } from "zod";

export const createProductAttributeSchema = z.object({
  productId: z.number(),
  attributeIds: z.array(z.number()).min(1),
});

export const updateProductAttributeSchema = createProductAttributeSchema.partial();
