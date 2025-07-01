'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, LoaderCircle } from 'lucide-react';

import { Product } from '@/types';
import { updateProduct, deleteProduct } from '@/lib/actions/products';
import {
    updateProductSchema,
    ProductFormUpdateInputs,
} from '@/lib/validations/admin/productFormSchema';
import { generateRows } from '@/lib/helpers';

import Table from '@/components/admin/Table';
import Modal from '@/components/Modal';
import ConfirmModal from '@/components/admin/ConfirmModal';
import Link from 'next/link';
import ProductForm from '@/components/admin/forms/Product';

type propType = {
    productData: Product;
};

export default function UpdateProductForm({ productData }: propType) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const variants =
        productData?.variants.length > 0 ? productData?.variants : null;
    const columns = variants
        ? [
              { key: 'sku', label: 'Variant SKU', hide: false },
              { key: 'price', label: 'Price', hide: false },
              { key: 'stock', label: 'Available', hide: false },
              { key: 'id', label: 'id', hide: true },
          ]
        : [];
    const rows = variants ? generateRows(variants, columns, true, false) : [];

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<ProductFormUpdateInputs>({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name: productData.name,
            description: productData.description,
            productType: productData.productType,
            brand: productData.brand ?? undefined,
        },
    });

    const onSubmit = async (data: ProductFormUpdateInputs) => {
        setIsLoading(true);

        const updatedProduct = {
            id: productData.id,
            name: data.name,
            description: data.description,
            productType: data.productType,
            brand: data.brand,
        };
        try {
            await updateProduct(updatedProduct);
            router.refresh();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            await deleteProduct(productData.id);
            router.push(`/admin/products`);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <ProductForm
                id={'product-form-update'}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
            />

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="font-semibold text-sm mb-2">Variants</p>
                <Link
                    href={`/admin/products/${productData.id}/variants/new`}
                    className="text-sm flex gap-1 items-center hover:bg-gray-100 w-fit p-2 rounded-md my-4"
                >
                    <span>
                        <CirclePlus className="h-5 w-5" />
                    </span>
                    Add options like size or color
                </Link>
                {variants && (
                    <Table
                        acceptImage
                        columns={columns}
                        rows={rows}
                        redirect={`/admin/products/${productData.id}/variants`}
                    />
                )}
            </div>

            <div className="flex items-center justify-end gap-4">
                <button
                    type="button"
                    className="text-sm cursor-pointer text-red-800 font-medium hover:underline"
                    onClick={() => setIsOpen(true)}
                >
                    Delete product
                </button>

                <button
                    form="product-form-update"
                    type="submit"
                    disabled={!isDirty || isLoading}
                    className={`${
                        isLoading || !isDirty
                            ? 'bg-neutral-400 cursor-default'
                            : 'bg-neutral-700 hover:bg-neutral-800 cursor-pointer'
                    } text-white text-sm p-2 rounded-md self-end`}
                >
                    {isLoading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <span>Save</span>
                    )}
                </button>
            </div>
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <ConfirmModal
                        entity={'product'}
                        entityItem={productData.name}
                        onClose={() => setIsOpen(false)}
                        onTrigger={handleDelete}
                    />
                </Modal>
            )}
        </div>
    );
}
