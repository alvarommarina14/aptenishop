'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    createProductSchema,
    ProductFormCreateInputs,
} from '@/lib/validations/admin/productFormSchema';
import { createProduct } from '@/lib/actions/products';

import ProductForm from '@/components/admin/forms/Product';

export default function CreateProductForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormCreateInputs>({
        resolver: zodResolver(createProductSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: ProductFormCreateInputs) => {
        try {
            const product = await createProduct(data);
            router.push(`/admin/products/${product.id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <ProductForm
                id={'product-form'}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
            />
            <button
                form="product-form"
                type="submit"
                className="bg-neutral-700 hover:bg-neutral-800 cursor-pointer text-white text-sm p-2 rounded-md self-end"
            >
                Save
            </button>
        </div>
    );
}
