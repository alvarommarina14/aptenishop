import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  description: z.string().min(3, "Description must have at least 3 characters"),
  productType: z.string().min(3, "ProductType must have at least 3 characters"),
  brand: z.string().min(3, "Brand must have at least 3 characters").optional(),
  variants: z
    .array(
      z.object({
        sku: z.string().min(1, "SKU is required"),
        price: z.number().positive("Price must be a positive number"),
        compareAtPrice: z.number().positive("Compare at price must be positive").optional().nullable(),
        stock: z.number().int().nonnegative("Stock must be zero or more"),
        isAvailable: z.boolean().optional(),
        images: z
          .array(
            z.object({
              url: z.string().url("Image URL must be valid"),
            }),
          )
          .min(1, "At least one image is required"),
        attributes: z
          .array(
            z.object({
              value: z.string().min(1, "Attribute value is required"),
              attributeId: z.number().int().positive("Attribute ID must be a positive integer"),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});

export const updateProductSchema = createProductSchema.partial();
