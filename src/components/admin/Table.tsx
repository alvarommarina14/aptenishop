import { TableColumn, RowData } from "@/types";
import Link from "next/link";

type TableProps = {
  columns: TableColumn[];
  rows: RowData[];
  acceptImage?: boolean;
};

export default function Table({ columns, rows, acceptImage }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-gray-700 bg-white">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            {columns.map((col) => {
              if (!col.hide) {
                return (
                  <th key={col.key} className="px-6 py-4">
                    {col.label}
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, colIndex) => {
                if (col.hide) return null;
                const cell = row[col.key];
                const cellValue = typeof cell === "string" ? cell : "";

                return (
                  <td key={col.key} className="px-6 py-4">
                    {colIndex === 0 ? (
                      <Link
                        href={`/admin/products/${row.id}`}
                        className="flex items-center gap-3 hover:underline text-inherit"
                      >
                        {acceptImage && row.image ? (
                          <>
                            <img
                              src={row.image.url}
                              alt={row.image.altText || ""}
                              className="h-10 w-10 rounded object-cover"
                            />
                            <span>{cellValue}</span>
                          </>
                        ) : (
                          cellValue
                        )}
                      </Link>
                    ) : (
                      cellValue
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
