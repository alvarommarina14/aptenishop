import { z } from "zod";

export const createProductAttributeSchema = z.object({
  productId: z.number(),
  name: z.string().min(3, "Name must have at least 3 characters"),
});

export const updateProductAttributeSchema = createProductAttributeSchema.partial();
