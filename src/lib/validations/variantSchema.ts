import { z } from "zod";

export const createVariantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),

  price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        const normalized = val.replace(",", ".");
        const parsed = Number(normalized);
        return isNaN(parsed) ? undefined : parsed;
      }
      return val;
    },
    z
      .number({
        invalid_type_error: "Price must be a number",
      })
      .positive("Price must be a positive number"),
  ),

  compareAtPrice: z
    .preprocess(
      (val) => {
        if (typeof val === "string") {
          const normalized = val.replace(",", ".");
          const parsed = Number(normalized);
          return isNaN(parsed) ? undefined : parsed;
        }
        return val;
      },
      z.number({
        invalid_type_error: "Compare at price must be a number",
      }),
    )
    .optional(),

  stock: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : Number(val)),
    z
      .number({
        invalid_type_error: "Stock is required",
      })
      .int("Stock must be an integer")
      .nonnegative("Stock must be a non-negative integer"),
  ),

  isAvailable: z.boolean().optional(),

  productId: z.number().int().positive("productId is required and must be a positive integer"),

  images: z
    .array(
      z.object({
        url: z.string().url("Image URL must be valid"),
        altText: z.string().min(3, "Alt text must have at least 3 characters").optional(),
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
