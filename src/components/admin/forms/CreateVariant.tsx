"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateVariantForm } from "@/types";
import { createVariant } from "@/lib/actions/variants";
import { updateVariantSchema } from "@/lib/validations/variantSchema";

type PropsType = {
  productReference: { productId: string };
};

export default function VariantPageCreateForm({ productReference }: PropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateVariantSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: CreateVariantForm) => {
    const dataCompleted = {
      ...data,
      isAvailable: data.stock > 0,
      productId: parseInt(productReference.productId),
    };

    try {
      const variant = await createVariant(dataCompleted);
      router.push(`/admin/products/${productReference.productId}/variants/${variant.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl mt-4">
        <h2 className="font-semibold mb-2">Media</h2>
        <div className="min-w-[400px] w-full bg-gray-100 h-[150px] border-dashed border-neutral-700 border rounded-md flex flex-col items-center justify-center">
          <p className="text-xs text-neutral-700">Accepts images</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl mt-4">
        <h2 className="font-semibold mb-2">Pricing</h2>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col mb-5 gap-2">
            <label htmlFor="price" className="text-sm text-neutral-700">
              Price
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              id="price"
              type="text"
              inputMode="decimal"
              className="border rounded-md border-neutral-500 text-sm p-2 pl-3 text-neutral-700"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div className="flex flex-col mb-5 gap-2">
            <label htmlFor="compareAtPrice" className="text-sm text-neutral-700">
              Compare at price
            </label>
            <input
              {...register("compareAtPrice", { valueAsNumber: true })}
              defaultValue={"0.00"}
              id="compareAtPrice"
              type="text"
              inputMode="decimal"
              className="border rounded-md border-neutral-500 text-sm p-2 pl-3 text-neutral-700"
            />
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
        className="bg-neutral-700 hover:bg-neutral-800 cursor-pointer text-white text-sm p-2 rounded-md self-end"
      >
        Save
      </button>
    </form>
  );
}
