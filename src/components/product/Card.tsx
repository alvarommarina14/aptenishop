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
                            width={20}
                            height={20}
                        />
                    )}
            </div>

            <div>
                <p className="font-semibold">{product.brand}</p>
                <p>{product.name}</p>

                {!selectedVariant.isAvailable && <p>No stock available</p>}
            </div>
        </a>
    );
}
