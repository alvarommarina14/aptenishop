import { z } from "zod";

export const createVariantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  price: z.number().positive("Price must be a positive number"),
  compareAtPrice: z.number().positive("CompareAtPrice must be positive").optional(),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  isAvailable: z.boolean().optional(),
  productId: z.number().int().positive("productId is required and must be a positive integer"),
  images: z
    .array(
      z.object({
        url: z.string().url("Image URL must be valid"),
      }),
    )
    .optional(),
  attributes: z
    .array(
      z.object({
        value: z.string().min(1, "Attribute value is required"),
        attributeId: z.number().int().positive("attributeId must be a positive integer"),
      }),
    )
    .optional(),
});

export const updateVariantSchema = createVariantSchema.partial();
