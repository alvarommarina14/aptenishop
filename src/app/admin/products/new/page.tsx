import PageTitle from "@/components/admin/PageTitle";
import { Tag } from "lucide-react";

export default function Orders() {
  const titleData = { title: "Add Product", icon: Tag };

  return (
    <div className="p-4">
      <PageTitle data={titleData} />
    </div>
  );
}
