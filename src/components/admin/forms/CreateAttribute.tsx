import { useRouter } from "next/navigation";

import { useForm, useFieldArray } from "react-hook-form";
import { CircleAlert } from "lucide-react";

import { createVariantAttibutes } from "@/lib/actions/attributes";

type AttributeForm = {
  name: string;
  values: { value: string }[];
};

type AttributesFormProps = {
  onClose: () => void;
  productReference: number;
};

export default function AttributesForm({ onClose, productReference }: AttributesFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AttributeForm>({
    defaultValues: {
      name: "",
      values: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  const onSubmit = async (data: AttributeForm) => {
    try {
      const nonEmptyValues = data.values.filter((v) => v.value.trim() !== "");
      const fullData = {
        productId: productReference,
        name: data.name,
        values: nonEmptyValues,
      };

      await createVariantAttibutes(fullData);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlur = (index: number, value: string) => {
    const isLast = index === fields.length - 1;

    if (!isLast && value.trim() === "") {
      remove(index);
    }

    if (isLast && value.trim() !== "") {
      append({ value: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" pl-12 pt-4 pr-4">
      <div className="flex flex-col mb-4 gap-2">
        <label className="text-sm text-neutral-700">Option name</label>
        <input
          {...register("name", { required: "Option name is required" })}
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

      <div className="flex flex-col gap-2 mb-4">
        <label className="text-sm text-neutral-700">Option values</label>
        {fields.map((field, index) => (
          <input
            key={field.id}
            {...register(`values.${index}.value`)}
            placeholder="Add value"
            type="text"
            className="border rounded-md border-neutral-500 text-sm p-2 pl-3"
            onBlur={(e) => handleBlur(index, e.target.value)}
          />
        ))}
      </div>

      <div className="flex justify-between text-xs mb-4">
        <button
          type="button"
          onClick={onClose}
          className="border border-neutral-200 shadow-md p-2 rounded-md bg-white hover:bg-gray-50 text-red-800 cursor-pointer"
        >
          Delete
        </button>
        <button
          type="submit"
          className="shadow-md p-2 rounded-md bg-neutral-700 hover:bg-neutral-800 text-white font-semibold cursor-pointer"
        >
          Done
        </button>
      </div>
    </form>
  );
}
