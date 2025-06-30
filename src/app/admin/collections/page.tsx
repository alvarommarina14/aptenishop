import PageTitle from "@/components/admin/PageTitle";
import { Tags } from "lucide-react";

export default function Collections() {
  const titleData = { title: "PageTitle", icon: Tags };

  return (
    <div className="p-4">
      <PageTitle data={titleData} />
    </div>
  );
}
