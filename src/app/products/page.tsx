import { GetAllProducts } from '@/lib/services/products';
import ProductCard from '@/components/product/Card';

export default async function Products() {
    const products = await GetAllProducts();

    return (
        <main>
            <h1>Products Page</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    return (
                        <div key={product.id} className="max-w-[350px]">
                            {/* <ProductCard product={product} /> */}
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
