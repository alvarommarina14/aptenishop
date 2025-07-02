export interface Attribute {
    id: number;
    name: string;
}

export interface AttributeValue {
    id: number;
    value: string;
    attributeId: number;
    attribute: Attribute;
}

export interface VariantValue {
    id: number;
    variantId: number;
    attributeValueId: number;
    attributeValue: AttributeValue;
}

export interface VariantImage {
    id: number;
    url: string;
    variantId: number;
    publicId: string;
    altText?: string | null;
}

export interface Variant {
    id: number;
    sku?: string | null;
    price?: number | null;
    compareAtPrice?: number | null;
    stock?: number | null;
    isAvailable?: boolean | null;
    productId: number;
    images: VariantImage[];
    variantValues: VariantValue[];
}

export interface ProductAttribute {
    id: number;
    productId: number;
    attributeId: number;
    attribute: Attribute;
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
    productAttributes: ProductAttribute[];
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

export interface CreateVariantFormType {
    sku: string;
    price?: unknown;
    compareAtPrice?: unknown;
    stock?: unknown;
    isAvailable?: boolean | undefined;
    productId: number;
    images?: File[] | null;
}

export interface CreateProductForm {
    name?: string;
    brand?: string;
    description?: string;
    productType?: string;
}

export interface UpdateProductType {
    id: number;
    name?: string;
    brand?: string;
    description?: string;
    productType?: string;
}
