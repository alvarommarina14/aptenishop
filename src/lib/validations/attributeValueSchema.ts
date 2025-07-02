import { z } from "zod";

export const createAttributeValueSchema = z.object({
  productAttributeId: z.number().optional(),
  values: z
    .array(
      z.object({
        value: z.string().nonempty("Value is required"),
      }),
    )
    .min(1, "At least one value is required"),
});

export const createAttributeValuesSchema = z.array(createAttributeValueSchema);

export const updateAttributeValueSchema = createAttributeValueSchema.partial();

export const updateAttributeValuesSchema = z.array(updateAttributeValueSchema);
