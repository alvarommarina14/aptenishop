export async function createVariantValues(
    data:
        | {
              variantId: number;
              attributeValueId: number;
          }[]
        | undefined
) {
    if (!data)
        throw {
            message: 'Variant options are empty',
        };
    try {
        const res = await fetch(`/api/variant-values`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json();
            throw {
                message: error.error || 'Failed to create variant values',
                fieldErrors: error.errors || {},
            };
        }

        return await res.json();
    } catch (err) {
        console.error('Error creating variant values:', err);
        throw err;
    }
}

type updateVariantaValuesType = {
    variantValues?: {
        attributeId: number;
        attributeValueId: number;
    }[];
};

export async function updateVariantValues(
    data: updateVariantaValuesType,
    variantId: number
) {
    try {
        const res = await fetch(`/api/variant-values/${variantId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json();
            throw {
                message: error.error || 'Failed to update variant values',
                fieldErrors: error.errors || {},
            };
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
}
