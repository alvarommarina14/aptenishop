import { GetAllProducts } from "@/lib/services/products";

export default async function Products() {
  const products = await GetAllProducts();

  return (
    <main>
      <div>
        <h1>Products Page</h1>
        {products.map((product) => {
          return (
            <div key={product.id} className="my-10">
              <p>{product.name}</p>
              <p>{product.productType}</p>
              <p>{product.description}</p>
              {product.variants.map((variant) => {
                return (
                  <div key={variant.id} className="mt-4 font-bold ml-10">
                    <p>{variant.price}</p>
                    <p>{variant.isAvailable}</p>
                    <p>{variant.sku}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </main>
  );
}
