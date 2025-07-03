import { z } from 'zod';

export const createVariantValueSchema = z.object({
    variantId: z.number(),
    attributeValueId: z.number(),
});

export const createVariantValuesArraySchema = z.array(createVariantValueSchema);

export const updateVariantValueSchema = createVariantValueSchema.partial();

export const updateVariantValuesArraySchema = z.array(updateVariantValueSchema);
