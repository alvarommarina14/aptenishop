import { z } from 'zod';

export const createVariantSchema = z.object({
    sku: z.string().nonempty('SKU is required'),
    price: z.preprocess(
        (val) => {
            if (val === '' || val == null) {
                return undefined;
            }
            if (typeof val === 'string') {
                return Number(val.replace(',', '.'));
            }
            return val;
        },
        z
            .number({
                invalid_type_error: 'Please enter a valid price',
            })
            .positive()
    ),
    compareAtPrice: z.preprocess((val) => {
        if (val === '' || val == null) {
            return undefined;
        }
        if (typeof val === 'string') {
            return Number(val.replace(',', '.'));
        }
        return val;
    }, z.number().optional()),
    stock: z.preprocess(
        (val) => (val === '' || val == null ? undefined : Number(val)),
        z.number().int().nonnegative().optional()
    ),
    isAvailable: z.boolean().optional(),
    productId: z.number().int().positive(),
    images: z.any().optional(),
    variantValues: z
        .array(
            z.object({
                attributeId: z.number().int().positive(),
                attributeValueId: z.number().int().positive(),
            })
        )
        .optional(),
});

export const createVariantsSchema = z.union([
    createVariantSchema,
    z.array(createVariantSchema),
]);

export const updateVariantSchema = createVariantSchema.partial();
