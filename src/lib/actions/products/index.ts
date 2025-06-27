import { CreateProductForm } from "@/types";

export async function createProduct(data: CreateProductForm) {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      console.log(error);

      throw {
        message: error.error || "Failed to create product",
        fieldErrors: error.errors || {},
      };
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}
