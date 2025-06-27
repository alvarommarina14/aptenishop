import PageTitle from "@/components/admin/PageTitle";
import { Tag } from "lucide-react";
import ProductForm from "./_form/Form";

export default function AddProduct() {
  const titleData = { title: "Add Product", icon: Tag };

  return (
    <div className="p-4 flex flex-col items-center ">
      <div>
        <PageTitle data={titleData} />
        <ProductForm />
      </div>
    </div>
  );
}
