import PageTitle from "@/components/admin/PageTitle";
import { User } from "lucide-react";

export default function Customers() {
  const titleData = { title: "Customers", icon: User };

  return (
    <div className="p-4">
      <PageTitle data={titleData} />
    </div>
  );
}
