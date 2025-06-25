export interface VariantImage {
  id: number;
  url: string;
  variantId: number;
  altText?: string | null;
}

export interface Attribute {
  id: number;
  name: string;
}

export interface VariantAttribute {
  id: number;
  value: string;
  variantId: number;
  attributeId: number;
  attribute: Attribute;
}

export interface Variant {
  id: number;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  isAvailable: boolean;
  productId: number;
  images: VariantImage[];
  attributes: VariantAttribute[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  productType: string;
  brand?: string | null;
  createdAt: Date;
  updatedAt: Date;
  variants: Variant[];
}

export interface TableColumn {
  key: string;
  label: string;
  hide: boolean;
}

export interface ImageData {
  url: string;
  altText?: string;
}

export interface RowData {
  image?: ImageData;
  [key: string]: string | ImageData | undefined;
}
