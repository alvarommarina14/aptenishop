import PageTitle from "@/components/admin/PageTitle";
import { Tag } from "lucide-react";
import ProductPageCreateForm from "@/components/admin/forms/CreateProduct";

export default function AddProduct() {
  const titleData = { title: "Add Product", icon: Tag };

  return (
    <div className="p-4 flex flex-col items-center ">
      <div>
        <PageTitle data={titleData} />
        <ProductPageCreateForm />
      </div>
    </div>
  );
}
