import { z } from "zod";

export const createProductAttributeSchema = z.object({
  productId: z.number(),
  attributeId: z.number().optional(),
});

export const updateProductAttributeSchema = createProductAttributeSchema.partial();
