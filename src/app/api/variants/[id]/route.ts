import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateVariantSchema } from '@/lib/validations/variantSchema';

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = parseInt((await params).id);

        const variant = await prisma.variant.findUnique({
            where: { id },
            include: {
                images: true,
                variantValues: {
                    include: {
                        attributeValue: {
                            include: {
                                productAttribute: true,
                            },
                        },
                    },
                },
            },
        });

        if (!variant) {
            return NextResponse.json(
                { message: 'Variant not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(variant);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const body = await req.json();
        const result = updateVariantSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const id = parseInt((await params).id);

        const updated = await prisma.variant.update({
            where: { id },
            data: result.data,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating variant:', error);
        return NextResponse.json(
            { message: 'Error updating variant' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = parseInt((await params).id);

        await prisma.variant.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Variant deleted' });
    } catch (error) {
        console.error('Error deleting variant:', error);
        return NextResponse.json(
            { message: 'Error deleting variant' },
            { status: 500 }
        );
    }
}
