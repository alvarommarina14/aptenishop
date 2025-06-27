"use client";
import { useForm } from "react-hook-form";
import { createProductSchema } from "@/lib/validations/admin/productFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductForm } from "@/types";
import { createProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: CreateProductForm) => {
    try {
      const product = await createProduct(data);
      router.push(`/admin/products/${product.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl mt-4">
        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="name" className="text-sm text-neutral-700">
            Title
          </label>
          <input {...register("name")} id="name" type="text" className="border rounded-md border-neutral-500 p-1" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="description" className="text-sm text-neutral-700">
            Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            rows={10}
            cols={60}
            className="border rounded-md border-neutral-500 p-1 resize-none"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="productType" className="text-sm text-neutral-700">
            Type
          </label>
          <input
            {...register("productType")}
            id="productType"
            type="text"
            className="border rounded-md border-neutral-500 p-1"
          />
          {errors.productType && <p className="text-red-500 text-sm">{errors.productType.message}</p>}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="brand" className="text-sm text-neutral-700">
            Brand
          </label>
          <input {...register("brand")} id="brand" type="text" className="border rounded-md border-neutral-500 p-1" />
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
