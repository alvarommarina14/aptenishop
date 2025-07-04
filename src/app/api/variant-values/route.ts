import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createVariantValuesArraySchema } from '@/lib/validations/variantValuesSchema';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const result = createVariantValuesArraySchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const variantValues = await prisma.variantValue.createMany({
            data: result.data,
            skipDuplicates: true,
        });

        return NextResponse.json(variantValues, { status: 201 });
    } catch (error) {
        console.error('Error creating variants:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
