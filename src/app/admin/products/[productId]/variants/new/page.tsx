import PageTitle from "@/components/admin/PageTitle";
import { Tag } from "lucide-react";
import VariantPageCreateForm from "@/components/admin/forms/CreateVariant";

type PropsType = {
  params: { productId: string };
};

export default async function ProductVariantNew({ params }: PropsType) {
  const productReference = await params;
  const titleData = { title: "Add Variant", icon: Tag };

  return (
    <div className="p-4 flex flex-col items-center ">
      <div>
        <PageTitle data={titleData} />
        <VariantPageCreateForm productReference={productReference} />
      </div>
    </div>
  );
}
