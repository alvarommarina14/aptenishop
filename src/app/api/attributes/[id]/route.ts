import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { updateAttributeSchema } from '@/lib/validations/attributeSchema';

const prisma = new PrismaClient();

export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const paramsx = await params;
        const id = parseInt(paramsx.id);

        const attribute = await prisma.attribute.findUnique({
            where: { id },
        });

        if (!attribute) {
            return NextResponse.json(
                { message: 'Atributo no encontrado' },
                { status: 404 }
            );
        }
        return NextResponse.json(attribute);
    } catch (error) {
        console.error('Error fetching attribute:', error);
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
        const paramsx = await params;

        const body = await req.json();
        const result = updateAttributeSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const id = parseInt(paramsx.id);

        const updated = await prisma.attribute.update({
            where: { id },
            data: result.data,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating attribute:', error);
        return NextResponse.json(
            { message: 'Error updating attribute' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const paramsx = await params;

        const id = parseInt(paramsx.id);

        await prisma.attribute.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Atributo eliminado' });
    } catch (error) {
        console.error('Error deleting attribute:', error);
        return NextResponse.json(
            { message: 'Error deleting attribute' },
            { status: 500 }
        );
    }
}
