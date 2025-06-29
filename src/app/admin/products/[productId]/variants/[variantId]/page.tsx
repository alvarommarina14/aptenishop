import Link from "next/link";

import { GetProductById } from "@/lib/services/products";

import { Tag } from "lucide-react";

import PageTitle from "@/components/admin/PageTitle";
import VariantPageUpdateForm from "@/components/admin/forms/UpdateVariant";

type PropsType = {
  params: {
    productId: string;
    variantId: string;
  };
};

export default async function VariantPage({ params }: PropsType) {
  const { productId, variantId } = await params;
  const product = await GetProductById(parseInt(productId));
  if (!product) return <div>No product found</div>;

  const variants = product.variants;
  const activeVariant = variants.filter((v) => v.id == parseInt(variantId));

  const titleData = { title: activeVariant[0].sku, icon: Tag };

  return (
    <div className="p-4 flex justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_700px] auto-rows-max gap-4">
        <div className="col-start-1 row-start-1">
          <PageTitle data={titleData} />
        </div>

        <div className="col-start-1 row-start-2 lg:col-start-1 lg:row-start-2">
          <div className="bg-white flex flex-col rounded-xl shadow-sm">
            <div className="p-4 flex gap-2 pb-6 border-b border-neutral-200">
              <img
                src={activeVariant[0].images[0]?.url}
                alt={activeVariant[0].images[0]?.altText || ""}
                className="h-30 w-30 rounded object-cover border border-neutral-200"
              />
              <div>
                <h2 className="text-lg">{product.name}</h2>
                <p className="text-neutral-500 text-sm mt-2">
                  {product.variants.length} {product.variants.length > 1 ? "variants" : "variant"}
                </p>
              </div>
            </div>
            {variants.map((variant) => (
              <Link
                key={variant.id}
                href={`/admin/products/${product.id}/variants/${variant.id}`}
                className={`p-2 hover:bg-gray-100 flex items-center gap-2 text-sm ${
                  variant.id == activeVariant[0].id && "bg-gray-100 font-semibold"
                }`}
              >
                {variant.images.length > 0 && (
                  <img
                    src={variant.images[0].url}
                    alt={variant.images[0].altText || ""}
                    className="h-12 w-12 rounded object-cover border border-neutral-200"
                  />
                )}
                {variant.sku}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-start-1 row-start-3 lg:col-start-2 lg:row-start-2">
          <VariantPageUpdateForm productReference={product.id} activeVariant={activeVariant[0]} />
        </div>
      </div>
    </div>
  );
}
