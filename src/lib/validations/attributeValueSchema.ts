import { z } from "zod";

export const createAttributeValueSchema = z.object({
  value: z.string().min(3, "Name must have at least 3 characters"),
  attributeId: z.number(),
});

export const updateAttributeValueSchema = createAttributeValueSchema.partial();
