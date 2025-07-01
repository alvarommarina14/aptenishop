"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, CirclePlus, LoaderCircle } from "lucide-react";

import { Product } from "@/types";
import { updateProduct, deleteProduct } from "@/lib/actions/products";
import { updateProductSchema, ProductFormUpdateInputs } from "@/lib/validations/admin/productFormSchema";

import Modal from "@/components/Modal";
import ConfirmModal from "@/components/admin/ConfirmModal";
import Link from "next/link";
import ProductForm from "@/components/admin/forms/Product";
import AttributesForm from "@/components/admin/forms/CreateAttribute";

type propType = {
  productData: Product;
};

export default function ProductPageUpdateForm({ productData }: propType) {
  const router = useRouter();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const variants = productData?.variants.length > 0 ? productData?.variants : null;

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
    const completeData = {
      ...data,
      id: productData.id,
    };

    try {
      await updateProduct(completeData);
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
      <ProductForm id={"product-form-update"} register={register} onSubmit={handleSubmit(onSubmit)} errors={errors} />

      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">Variants</p>
            {variants && (
              <Link
                href={`/admin/products/${productData.id}/variants/new`}
                className="text-xs flex gap-1 items-center bg-white hover:bg-gray-100 w-fit p-2 rounded-md border border-neutral-200 shadow-sm"
              >
                <span>
                  <Plus className="h-4 w-4" />
                </span>
                Add Variant
              </Link>
            )}
          </div>
          {!isOpenForm && productData.productAttributes.length < 1 && (
            <button
              type="button"
              className="text-sm flex gap-2 items-center p-2 my-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => setIsOpenForm(true)}
            >
              <span>
                <CirclePlus className="w-4 h-4" />
              </span>
              Add options like size or color
            </button>
          )}
          {productData.productAttributes.length > 0 && (
            <div className="border border-neutral-200 rounded-md my-4">
              {productData.productAttributes.map((attr) => {
                const valuesForAttribute = new Set<string>();

                variants?.forEach((variant) => {
                  variant.variantValues.forEach((vv) => {
                    if (vv.attributeValue.attributeId === attr.attributeId) {
                      valuesForAttribute.add(vv.attributeValue.value);
                    }
                  });
                });

                return (
                  <div className="border-b border-neutral-200" key={attr.id}>
                    <button
                      type="button"
                      onClick={() => setIsOpenForm(true)}
                      className="w-full hover:bg-gray-100 text-start p-4 cursor-pointer"
                    >
                      <p className="font-semibold text-sm">{attr.attribute.name}</p>
                      {[...valuesForAttribute].map((val, i) => (
                        <span key={i} className="inline-block mr-2 text-sm text-gray-700 bg-gray-200 p-1 rounded-md">
                          {val}
                        </span>
                      ))}
                    </button>
                  </div>
                );
              })}
              {productData.productAttributes.length < 3 && (
                <>
                  {isOpenForm ? (
                    <AttributesForm productReference={productData.id} onClose={() => setIsOpenForm(false)} />
                  ) : (
                    <button
                      type="button"
                      className="text-sm w-full flex gap-2 items-center p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                      onClick={() => setIsOpenForm(true)}
                    >
                      <span>
                        <CirclePlus className="w-4 h-4" />
                      </span>
                      Add another options
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {isOpenForm && productData.productAttributes.length < 1 && (
            <AttributesForm productReference={productData.id} onClose={() => setIsOpenForm(false)} />
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
            form="update-product"
            type="submit"
            disabled={!isDirty || isLoading}
            className={`${
              isLoading || !isDirty
                ? "bg-neutral-400 cursor-default"
                : "bg-neutral-700 hover:bg-neutral-800 cursor-pointer"
            } text-white text-sm p-2 rounded-md self-end`}
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : <span>Save</span>}
          </button>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <ConfirmModal
            entity={"product"}
            entityItem={productData.name}
            onClose={() => setIsOpen(false)}
            onTrigger={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
}
