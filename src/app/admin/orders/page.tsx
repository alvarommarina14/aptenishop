import PageTitle from "@/components/admin/PageTitle";
import { Inbox } from "lucide-react";

export default function Orders() {
  const titleData = { title: "Orders", icon: Inbox };

  return (
    <div className="p-4">
      <PageTitle data={titleData} />
    </div>
  );
}
