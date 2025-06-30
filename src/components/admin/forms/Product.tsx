import { CircleAlert } from "lucide-react";
import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";

type ProductFormType<T extends FieldValues> = {
  id: string;
  onSubmit: () => void;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export default function ProductForm<T extends FieldValues>({ onSubmit, register, errors, id }: ProductFormType<T>) {
  return (
    <form id={id} onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl mt-4 shadow-sm">
        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="name" className="text-sm text-neutral-700">
            Title
          </label>
          <input
            {...register("name" as Path<T>)}
            id="name"
            type="text"
            className={`border rounded-md border-neutral-500 text-sm p-2 pl-3 ${
              errors.name ? "bg-red-100 border-red-700" : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-700 text-sm flex gap-1 items-center">
              <CircleAlert className="h-4 w-4" />
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="description" className="text-sm text-neutral-700">
            Description
          </label>
          <textarea
            {...register("description" as Path<T>)}
            id="description"
            rows={10}
            cols={60}
            className={`border rounded-md border-neutral-500 text-sm p-2 pl-3 resize-none ${
              errors.description ? "bg-red-100 border-red-700" : ""
            }`}
          />
          {errors.description && (
            <p className="text-red-700 text-sm flex gap-1 items-center">
              <CircleAlert className="h-4 w-4" />
              {String(errors.description.message)}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="productType" className="text-sm text-neutral-700">
            Type
          </label>
          <input
            {...register("productType" as Path<T>)}
            id="productType"
            type="text"
            className={`border rounded-md border-neutral-500 text-sm p-2 pl-3 ${
              errors.productType ? "bg-red-100 border-red-700" : ""
            }`}
          />
          {errors.productType && (
            <p className="text-red-700 text-sm flex gap-1 items-center">
              <CircleAlert className="h-4 w-4" />
              {String(errors.productType.message)}
            </p>
          )}
        </div>

        <div className="flex flex-col mb-5 gap-2">
          <label htmlFor="brand" className="text-sm text-neutral-700">
            Brand
          </label>
          <input
            {...register("brand" as Path<T>)}
            id="brand"
            type="text"
            className="border rounded-md border-neutral-500 text-sm p-2 pl-3"
          />
        </div>
      </div>
    </form>
  );
}
