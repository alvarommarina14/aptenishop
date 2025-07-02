export async function createVariantAttibutes(data: { name: string; productId: number; values: { value: string }[] }) {
  if (data.values.length < 1) throw new Error("Enter at least one option value");
  try {
    const res = await fetch(`/api/variant-values-bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    throw error;
  }
}
