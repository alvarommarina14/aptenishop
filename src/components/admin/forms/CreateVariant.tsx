import { Variant } from "@/types";

type propType = {
  productVariants: Variant[] | null;
};

export default function VariantPageCreateForm({ productVariants }: propType) {
  return (
    <form className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl mt-4">
        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="name" className="text-sm text-neutral-700">
            Title
          </label>
          <input
            // defaultValue={productData.name}
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
            // defaultValue={productData.description}
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
            // defaultValue={productData.productType}
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
            // defaultValue={productData.brand ? productData.brand : undefined}
            id="brand"
            type="text"
            className="border rounded-md border-neutral-500 p-1"
          />
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
