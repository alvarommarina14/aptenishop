import { GetProductById } from "@/lib/services/products";

type Props = {
  params: { id: string };
};

export default async function Product({ params }: Props) {
  const product = await GetProductById(parseInt(params.id));

  if (!product) {
    return <p>Product not found</p>;
  }

  const selectedVariant = product.variants.find((v) => v.isAvailable) || product.variants[0];

  return (
    <div>
      <div>
        <p className="font-semibold">{product.brand}</p>
        <h1>{product.name}</h1>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-xl">${selectedVariant.price}</p>
          {selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
            <p className="line-through text-lg text-gray-400">${selectedVariant.compareAtPrice}</p>
          )}
        </div>
        {!selectedVariant.isAvailable && <p>No stock available</p>}
      </div>
    </div>
  );
}
