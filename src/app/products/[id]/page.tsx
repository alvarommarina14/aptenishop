import { GetProductById } from '@/lib/services/products';
import Image from 'next/image';

type Props = {
    params: Promise<{ id: string }>;
};

export default async function Product({ params }: Props) {
    const { id } = await params;
    const product = await GetProductById(parseInt(id));

    if (!product) {
        return <p>Producto no encontrado</p>;
    }

    const selectedVariant =
        product.variants.find((v) => v.isAvailable) || product.variants[0];

    return (
        <main>
            <div>
                <div className="flex">
                    <div>
                        <Image
                            src={selectedVariant.images[0].url}
                            alt={
                                selectedVariant.images[0].altText! ?? undefined
                            }
                        />
                    </div>
                    <div>
                        <p className="font-semibold">{product.brand}</p>
                        <h1>{product.name}</h1>
                        <div className="flex items-center gap-2">
                            <p className="font-semibold text-xl">
                                ${selectedVariant.price}
                            </p>
                            {selectedVariant.compareAtPrice &&
                                selectedVariant.compareAtPrice >
                                    selectedVariant.price! && (
                                    <p className="line-through text-lg text-gray-400">
                                        ${selectedVariant.compareAtPrice}
                                    </p>
                                )}
                        </div>
                        {!selectedVariant.isAvailable && (
                            <p>No stock available</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
