import { GetProductById } from "@/lib/services/products";

type Props = {
  params: { id: string };
};

export default async function Product({ params }: Props) {
  const product = await GetProductById(parseInt(params.id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <div>
        <h1>{product.name}</h1>
        <p className="">{product.description}</p>
        <p className="">{product.brand}</p>
        <p className="">{product.productType}</p>
      </div>
    </div>
  );
}
