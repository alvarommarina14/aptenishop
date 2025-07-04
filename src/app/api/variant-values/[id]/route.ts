import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateVariantSchema } from '@/lib/validations/variantSchema';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();
        const id = parseInt((await params).id);

        const parseResult = updateVariantSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                { errors: parseResult.error.flatten().fieldErrors },
                { status: 400 }
            );
        }
        const newValues = parseResult.data.variantValues;
        if (!newValues)
            return NextResponse.json(
                { message: 'Values are empty' },
                { status: 400 }
            );

        const variant = await prisma.variant.findUnique({
            where: { id },
            include: {
                variantValues: {
                    include: { attributeValue: true },
                },
            },
        });

        if (!variant) {
            return NextResponse.json(
                { message: 'Variant not found' },
                { status: 404 }
            );
        }

        const productId = variant.productId;

        const updatedVariantValues = variant.variantValues.map((vv) => {
            const update = newValues.find(
                (nv) => nv.attributeId === vv.attributeValue.productAttributeId
            );
            return update
                ? {
                      attributeId: vv.attributeValue.productAttributeId,
                      attributeValueId: update.attributeValueId,
                  }
                : {
                      attributeId: vv.attributeValue.productAttributeId,
                      attributeValueId: vv.attributeValueId,
                  };
        });

        const otherVariants = await prisma.variant.findMany({
            where: {
                productId,
                NOT: { id },
            },
            include: {
                variantValues: { include: { attributeValue: true } },
            },
        });

        const newKey = updatedVariantValues
            .map((v) => `${v.attributeId}:${v.attributeValueId}`)
            .sort()
            .join('|');

        const conflict = otherVariants.some((v) => {
            const otherKey = v.variantValues
                .map(
                    (vv) =>
                        `${vv.attributeValue.productAttributeId}:${vv.attributeValueId}`
                )
                .sort()
                .join('|');
            return otherKey === newKey;
        });

        if (conflict) {
            return NextResponse.json(
                {
                    message:
                        'A variant with the same attribute values already exists.',
                },
                { status: 409 }
            );
        }

        for (const nv of newValues) {
            const existingVV = variant.variantValues.find(
                (vv) => vv.attributeValue.productAttributeId === nv.attributeId
            );
            if (existingVV) {
                await prisma.variantValue.update({
                    where: { id: existingVV.id },
                    data: { attributeValueId: nv.attributeValueId },
                });
            }
        }

        return NextResponse.json({
            message: 'Variant values updated successfully',
        });
    } catch (error) {
        console.error('Error updating variant values:', error);
        return NextResponse.json(
            { message: 'Error updating variant values' },
            { status: 500 }
        );
    }
}
