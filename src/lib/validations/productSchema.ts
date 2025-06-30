import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  description: z.string().min(3, "Description must have at least 3 characters"),
  productType: z.string().min(3, "ProductType must have at least 3 characters"),
  brand: z.string().min(3, "Brand must have at least 3 characters").optional(),
});

export const updateProductSchema = createProductSchema.partial();
