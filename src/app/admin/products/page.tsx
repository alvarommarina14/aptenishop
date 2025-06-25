import { GetAllProducts } from "@/lib/services/products";
import Table from "@/components/admin/Table";
import { generateRows } from "@/lib/helpers";

export default async function Products() {
  const products = await GetAllProducts();
  const columns = [
    { key: "name", label: "Product", hide: false },
    { key: "stock", label: "Inventory", hide: false },
    { key: "productType", label: "Category", hide: false },
    { key: "id", label: "id", hide: true },
  ];

  const rows = generateRows(products, columns, true);
  console.log(rows);

  return (
    <div className="p-4">
      <h1>Products page</h1>
      <Table acceptImage columns={columns} rows={rows} />
    </div>
  );
}
