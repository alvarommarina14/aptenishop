import { GetAllProducts } from "@/lib/services/products";
import Table from "@/components/admin/Table";
import PageTitle from "@/components/admin/PageTitle";
import { generateRows } from "@/lib/helpers";
import { Tag } from "lucide-react";
import Link from "next/link";

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
      <div className="flex justify-between items-center mb-4">
        <PageTitle data={titleData} />
        <Link
          href={"/admin/products/new"}
          className="p-2 bg-neutral-800 hover:bg-neutral-900 text-white text-sm rounded-md shadow-md cursor-pointer"
        >
          Add product
        </Link>
      </div>
      <Table acceptImage columns={columns} rows={rows} />
    </div>
  );
}
