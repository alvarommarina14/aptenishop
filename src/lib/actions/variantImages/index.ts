export async function createVariantImages(data: { url: string; variantId: number }[] | undefined) {
  try {
    const res = await fetch(`/api/variant-images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw {
        message: error.error || "Failed to create variant images",
        fieldErrors: error.errors || {},
      };
    }

    return await res.json();
  } catch (err) {
    throw err;
  }
}
