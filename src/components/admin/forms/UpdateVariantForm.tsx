'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoaderCircle } from 'lucide-react';

import { CreateVariantFormType, Variant } from '@/types';
import { uploadImagesToCloudinary } from '@/lib/actions/cloudinary';
import { createVariantImages } from '@/lib/actions/variantImages';
import { updateVariant, deleteVariant } from '@/lib/actions/variants';
import { updateVariantSchema } from '@/lib/validations/variantSchema';

import UploadFile from '@/components/admin/UploadFile';
import Modal from '@/components/Modal';
import ConfirmModal from '@/components/admin/ConfirmModal';

type PropsType = {
    productReference: number;
    activeVariant: Variant;
};

export default function UpdateVariantForm({
    productReference,
    activeVariant,
}: PropsType) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<CreateVariantFormType>({
        resolver: zodResolver(updateVariantSchema),
        defaultValues: {
            price: activeVariant.price,
            compareAtPrice: activeVariant.compareAtPrice,
            sku: activeVariant.sku!,
            stock: activeVariant.stock,
        },
    });

    const onSubmit = async (data: CreateVariantFormType) => {
        setIsLoading(true);
        const { images, ...restData } = data;

        try {
            const files = images ? (images as File[]) : null;
            const uploadedImages = await uploadImagesToCloudinary(files);

            const dataCompleted = {
                ...restData,
                isAvailable:
                    typeof data.stock == 'number' ? data.stock > 0 : false,
                productId: productReference,
            };

            const variant = await updateVariant(
                dataCompleted,
                activeVariant.id
            );

            const imagesFormatted = uploadedImages?.map((img) => ({
                url: img.url,
                publicId: img.publicId,
                variantId: parseInt(variant.id),
            }));

            if (imagesFormatted?.length) {
                await createVariantImages(imagesFormatted);
            }
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
            await deleteVariant(activeVariant.id);
            router.push(`/admin/products/${productReference}`);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <UploadFile
                setValue={setValue}
                variantImages={activeVariant.images}
                setIsLoading={setIsLoading}
            />
            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2">Pricing</h2>
                <div className="flex justify-between gap-4">
                    <div className="flex flex-col mb-5 gap-2 w-full">
                        <label
                            htmlFor="price"
                            className="text-sm text-neutral-700"
                        >
                            Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none">
                                $
                            </span>
                            <input
                                {...register('price', { valueAsNumber: true })}
                                placeholder="0.00"
                                id="price"
                                type="text"
                                inputMode="decimal"
                                className="border rounded-md border-neutral-500 text-sm p-2 pl-7 text-neutral-700 w-full"
                            />
                        </div>
                        {errors.price && (
                            <p className="text-red-500 text-sm">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col mb-5 gap-2 w-full">
                        <label
                            htmlFor="compareAtPrice"
                            className="text-sm text-neutral-700"
                        >
                            Compare at price
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none">
                                $
                            </span>
                            <input
                                {...register('compareAtPrice', {
                                    valueAsNumber: true,
                                })}
                                id="compareAtPrice"
                                type="text"
                                inputMode="decimal"
                                className="border rounded-md border-neutral-500 text-sm p-2 pl-7 text-neutral-700 w-full"
                            />
                        </div>
                        {errors.compareAtPrice && (
                            <p className="text-red-500 text-sm">
                                {errors.compareAtPrice.message}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
                <h2 className="font-semibold mb-2">Inventory</h2>
                <div className="flex flex-col mb-5 gap-2">
                    <label htmlFor="sku" className="text-sm text-neutral-700">
                        {`SKU (Stock Keeping Unit)`}
                    </label>
                    <input
                        {...register('sku')}
                        id="sku"
                        type="text"
                        className="border rounded-md border-neutral-500 text-sm p-2 pl-3 "
                    />
                    {errors.sku && (
                        <p className="text-red-500 text-sm">
                            {errors.sku.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col mb-5 gap-2">
                    <label htmlFor="stock" className="text-sm text-neutral-700">
                        Stock
                    </label>
                    <input
                        {...register('stock', { valueAsNumber: true })}
                        id="stock"
                        type="number"
                        className="border rounded-md border-neutral-500 text-sm p-2 pl-3"
                    />
                    {errors.stock && (
                        <p className="text-red-500 text-sm">
                            {errors.stock.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end gap-4">
                <button
                    type="button"
                    className="text-sm cursor-pointer text-red-800 font-medium hover:underline"
                    onClick={() => setIsOpen(true)}
                >
                    Delete variant
                </button>

                <button
                    type="submit"
                    disabled={isLoading || !isDirty}
                    className={`${
                        isLoading || !isDirty
                            ? 'bg-neutral-400 cursor-default'
                            : 'bg-neutral-700 hover:bg-neutral-800 cursor-pointer'
                    } text-white text-sm p-2 rounded-md`}
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
                        entity={'variant'}
                        entityItem={activeVariant.sku!}
                        onClose={() => setIsOpen(false)}
                        onTrigger={handleDelete}
                    />
                </Modal>
            )}
        </form>
    );
}
