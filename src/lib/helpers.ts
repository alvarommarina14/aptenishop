import { RowData, TableColumn, ImageData } from "@/types";

const isObject = (val: unknown): val is Record<string, unknown> => typeof val === "object" && val !== null;

const findValueByKey = (obj: unknown, key: string): string | undefined => {
  if (!isObject(obj)) return;

  if (key in obj) {
    const val = obj[key];
    if (typeof val === "string" || typeof val === "number") return String(val);
  }

  for (const value of Object.values(obj)) {
    const found = findValueByKey(value, key);
    if (found) return found;
  }
};

const extractImage = (obj: unknown): ImageData | undefined => {
  if (!isObject(obj)) return;

  if ("images" in obj && Array.isArray(obj.images)) {
    const img = obj.images.find(
      (i): i is { url: string; altText?: string } => isObject(i) && typeof i.url === "string",
    );
    if (img) return { url: img.url, altText: img.altText ?? "" };
  }

  for (const value of Object.values(obj)) {
    const found = extractImage(value);
    if (found) return found;
  }
};

const getStockSummary = (obj: unknown) => {
  if (!isObject(obj) || !Array.isArray(obj.variants)) return "";
  const variants = obj.variants.filter(isObject);
  const total = variants.reduce((sum, v) => sum + (typeof v.stock === "number" ? v.stock : 0), 0);
  return variants.length > 1
    ? `${total} in stock for ${variants.length} variants`
    : variants.length === 1
    ? `${total} in stock`
    : "";
};

export const generateRows = (data: unknown[], columns: TableColumn[], includeImage = false) =>
  data.map((item) => {
    const row: RowData = {};

    for (const { key } of columns) {
      row[key] = key === "stock" ? getStockSummary(item) : findValueByKey(item, key) ?? "";
    }

    if (includeImage) {
      const image = extractImage(item);
      if (image) row.image = image;
    }

    return row;
  });
