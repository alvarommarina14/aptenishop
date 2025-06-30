type UploadedImage = {
  url: string;
  publicId: string;
};

export async function uploadImagesToCloudinary(files: File[] | null): Promise<UploadedImage[] | undefined> {
  if (!files || files.length === 0) return;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const images: UploadedImage[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset!);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Cloudinary upload failed");

    const data = await res.json();

    images.push({
      url: data.secure_url,
      publicId: data.public_id,
    });
  }

  return images;
}
