import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const data = await req.json();

        const id = parseInt((await params).id);

        const updated = await prisma.attributeValue.update({
            where: { id },
            data,
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating attribute value:', error);
        return NextResponse.json(
            { message: 'Error updating attribute value' },
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

        await prisma.attributeValue.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Atributo eliminada' });
    } catch (error) {
        console.error('Error deleting attribute value:', error);
        return NextResponse.json(
            { message: 'Error deleting attribute value' },
            { status: 500 }
        );
    }
}
