"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle } from "lucide-react";

import { CreateVariantForm } from "@/types";
import { uploadImagesToCloudinary } from "@/lib/actions/cloudinary";
import { createVariantImages } from "@/lib/actions/variantImages";
import { createVariant } from "@/lib/actions/variants";
import { createVariantSchema } from "@/lib/validations/variantSchema";

import UploadFile from "@/components/admin/UploadFile";

type PropsType = {
  productReference: { productId: string };
};

export default function VariantPageCreateForm({ productReference }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createVariantSchema),
  });

  const watchFiles = watch("images");

  const onSubmit = async (data: CreateVariantForm) => {
    setIsLoading(true);
    const { images, ...restData } = data;

    try {
      const files = images as File[];
      const uploadedImageUrls = await uploadImagesToCloudinary(files);

      const dataCompleted = {
        ...restData,
        isAvailable: data.stock > 0,
        productId: parseInt(productReference.productId),
      };

      const variant = await createVariant(dataCompleted);
      const imagesFormatted = uploadedImageUrls.map((url) => ({
        url,
        variantId: parseInt(variant.id),
      }));

      await createVariantImages(imagesFormatted);
      router.push(`/admin/products/${productReference.productId}/variants/${variant.id}`);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl mt-4">
        <h2 className="font-semibold mb-2">Media</h2>
        <UploadFile setValue={setValue} watchFiles={watchFiles} />
      </div>
      <div className="bg-white p-4 rounded-xl mt-4">
        <h2 className="font-semibold mb-2">Pricing</h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col mb-5 gap-2 w-full">
            <label htmlFor="price" className="text-sm text-neutral-700">
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none">
                $
              </span>
              <input
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
                id="price"
                type="text"
                inputMode="decimal"
                className="border rounded-md border-neutral-500 text-sm p-2 pl-7 text-neutral-700 w-full"
              />
            </div>
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div className="flex flex-col mb-5 gap-2 w-full">
            <label htmlFor="compareAtPrice" className="text-sm text-neutral-700">
              Compare at price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none">
                $
              </span>
              <input
                {...register("compareAtPrice", { valueAsNumber: true })}
                defaultValue="0.00"
                id="compareAtPrice"
                type="text"
                inputMode="decimal"
                className="border rounded-md border-neutral-500 text-sm p-2 pl-7 text-neutral-700 w-full"
              />
            </div>
            {errors.compareAtPrice && <p className="text-red-500 text-sm">{errors.compareAtPrice.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl mt-4">
        <h2 className="font-semibold mb-2">Inventory</h2>
        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="sku" className="text-sm text-neutral-700">
            {`SKU (Stock Keeping Unit)`}
          </label>
          <input
            {...register("sku")}
            id="sku"
            type="text"
            className="border rounded-md border-neutral-500 text-sm p-2 pl-3 "
          />
          {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="stock" className="text-sm text-neutral-700">
            Stock
          </label>
          <input
            {...register("stock", { valueAsNumber: true })}
            defaultValue={"0"}
            id="stock"
            type="number"
            className="border rounded-md border-neutral-500 text-sm p-2 pl-3"
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`${
          isLoading ? "bg-neutral-400 cursor-default" : "bg-neutral-700 hover:bg-neutral-800 cursor-pointer"
        } text-white text-sm p-2 rounded-md self-end`}
      >
        {isLoading ? <LoaderCircle className="animate-spin" /> : <span>Save</span>}
      </button>
    </form>
  );
}
