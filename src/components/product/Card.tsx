import { Product } from '@/types';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const selectedVariant =
        product.variants.find((v) => v.isAvailable) || product.variants[0];

    return (
        <a href={`/products/${product.id}`} className="">
            <div>
                {selectedVariant.images[0].url &&
                    selectedVariant.images[0].altText && (
                        <Image
                            src={selectedVariant.images[0].url}
                            alt={selectedVariant.images[0].altText ?? undefined}
                        />
                    )}
            </div>

            <div>
                <p className="font-semibold">{product.brand}</p>
                <p>{product.name}</p>
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-xl">
                        ${selectedVariant.price}
                    </p>
                    {selectedVariant.compareAtPrice &&
                        selectedVariant.price &&
                        selectedVariant.compareAtPrice >
                            selectedVariant.price && (
                            <p className="line-through text-lg text-gray-400">
                                ${selectedVariant.compareAtPrice}
                            </p>
                        )}
                </div>
                {!selectedVariant.isAvailable && <p>No stock available</p>}
            </div>
        </a>
    );
}
