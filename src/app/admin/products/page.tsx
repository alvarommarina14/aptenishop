import { GetAllProducts } from "@/lib/services/products";
import Table from "@/components/admin/Table";
import PageTitle from "@/components/admin/PageTitle";
import { generateRows } from "@/lib/helpers";
import { Tag } from "lucide-react";

export default async function Products() {
  const products = await GetAllProducts();
  const titleData = { title: "Products", icon: Tag };
  const columns = [
    { key: "name", label: "Product", hide: false },
    { key: "stock", label: "Inventory", hide: false },
    { key: "productType", label: "Category", hide: false },
    { key: "id", label: "id", hide: true },
  ];
  const rows = generateRows(products, columns, true);

  return (
    <div className="p-4">
      <PageTitle data={titleData} />
      <Table acceptImage columns={columns} rows={rows} />
    </div>
  );
}
