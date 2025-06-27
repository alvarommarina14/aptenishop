"use client";

import { Product } from "@/types";
import Table from "@/components/admin/Table";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

type propType = {
  productData: Product;
};

export default function ProductPageUpdateForm({ productData }: propType) {
  return (
    <form className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl mt-4">
        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="name" className="text-sm text-neutral-700">
            Title
          </label>
          <input
            defaultValue={productData.name}
            id="name"
            type="text"
            className="border rounded-md border-neutral-500 p-1"
          />
          {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="description" className="text-sm text-neutral-700">
            Description
          </label>
          <textarea
            // {...register("description")}
            defaultValue={productData.description}
            id="description"
            rows={10}
            cols={60}
            className="border rounded-md border-neutral-500 p-1 resize-none"
          />
          {/* {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>} */}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="productType" className="text-sm text-neutral-700">
            Type
          </label>
          <input
            defaultValue={productData.productType}
            id="productType"
            type="text"
            className="border rounded-md border-neutral-500 p-1"
          />
          {/* {errors.productType && <p className="text-red-500 text-sm">{errors.productType.message}</p>} */}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="brand" className="text-sm text-neutral-700">
            Brand
          </label>
          <input
            defaultValue={productData.brand ? productData.brand : undefined}
            id="brand"
            type="text"
            className="border rounded-md border-neutral-500 p-1"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl mt-4">
        {productData.variants.length > 0 ? (
          // <Table acceptImage rows={} columns={} />
          <p>Table</p>
        ) : (
          <>
            <p className="font-semibold text-sm mb-2">Variants</p>
            <Link
              href={`/admin/products/${productData.id}/variants/new`}
              className="text-sm flex gap-1 items-center hover:bg-gray-100 w-fit p-2 rounded-md"
            >
              <span>
                <CirclePlus className="h-5 w-5" />
              </span>
              Add options like size or color
            </Link>
          </>
        )}
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
