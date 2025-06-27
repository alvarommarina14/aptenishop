import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Title must have at least 3 characters"),
  description: z.string().min(3, "Description must have at least 3 characters"),
  productType: z.string().min(3, "Type must have at least 3 characters"),
  brand: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();
