import { CreateVariantForm } from "@/types";

export async function createVariant(data: CreateVariantForm) {
  try {
    const res = await fetch(`/api/variants`, {
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
        message: error.error || "Failed to create variant",
        fieldErrors: error.errors || {},
      };
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}
