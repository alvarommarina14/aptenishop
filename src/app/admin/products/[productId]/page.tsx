import { GetProductById } from "@/lib/services/products";
import PageTitle from "@/components/admin/PageTitle";
import { Tag } from "lucide-react";
import ProductPageUpdateForm from "@/components/admin/forms/UpdateProduct";

type Props = {
  params: { productId: string };
};

export default async function Product({ params }: Props) {
  const product = await GetProductById(parseInt(params.productId));

  if (!product) {
    return <p>Product not found</p>;
  }

  const titleData = { title: product.name, icon: Tag };

  return (
    <div className="p-4 flex flex-col items-center ">
      <div>
        <PageTitle data={titleData} />
        <ProductPageUpdateForm productData={product} />
      </div>
    </div>
  );
}
