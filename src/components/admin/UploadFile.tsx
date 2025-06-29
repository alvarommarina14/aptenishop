import { useState } from "react";
import { useRouter } from "next/navigation";

import { UseFormSetValue } from "react-hook-form";
import { Plus } from "lucide-react";
import { CreateVariantForm, VariantImage } from "@/types";
import { deleteVariantImages } from "@/lib/actions/variantImages";

type UploadFileProps = {
  setValue: UseFormSetValue<CreateVariantForm>;
  variantImages?: VariantImage[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type ServerImage = { type: "server"; data: VariantImage };
type LocalImage = { type: "local"; data: string; file: File };
type ImageItem = ServerImage | LocalImage;

export default function UploadFile({ setValue, variantImages = [], setIsLoading }: UploadFileProps) {
  const router = useRouter();
  const [images, setImages] = useState<ImageItem[]>(variantImages.map((img) => ({ type: "server", data: img })));
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const updateFormFiles = (imageItems: ImageItem[]) => {
    const localFiles = imageItems.filter((img): img is LocalImage => img.type === "local").map((img) => img.file);

    setValue("images", localFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages: LocalImage[] = files.map((file) => ({
      type: "local",
      data: URL.createObjectURL(file),
      file,
    }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    updateFormFiles(updatedImages);
  };

  const toggleSelection = (index: number) => {
    setSelectedIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const deleteSelected = async () => {
    if (selectedIndexes.length === 0) return;

    const toDelete = selectedIndexes.map((i) => images[i]);
    const remaining = images.filter((_, i) => !selectedIndexes.includes(i));

    toDelete.forEach((img) => {
      if (img.type === "local") URL.revokeObjectURL(img.data);
    });

    setImages(remaining);
    updateFormFiles(remaining);
    setSelectedIndexes([]);

    const serverImages = toDelete.filter((img): img is ServerImage => img.type === "server");
    if (serverImages.length > 0) {
      setIsLoading(true);
      await deleteVariantImages(
        serverImages.map((img) => ({
          id: img.data.id,
          publicId: img.data.publicId,
        })),
      );
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between">
        <h2 className="font-semibold">Media</h2>
        {selectedIndexes.length > 0 && (
          <button
            type="button"
            onClick={deleteSelected}
            className="text-sm cursor-pointer text-red-800 font-medium hover:underline"
          >
            Delete selection
          </button>
        )}
      </div>

      <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />

      {images.length === 0 ? (
        <div className="mt-2 min-w-[400px] w-full bg-gray-100 h-[200px] border-dashed border-neutral-700 border rounded-md flex flex-col items-center justify-center">
          <label
            htmlFor="file-upload"
            className="bg-white hover:bg-gray-50 rounded-md text-xs font-semibold p-2 shadow-md cursor-pointer"
          >
            Upload new
          </label>
          <p className="text-xs text-neutral-700 mt-2">Only accepts images</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 mt-2 max-w-full">
          {images.map((img, index) => (
            <div
              key={img.type === "server" ? img.data.id : img.data}
              className="relative border border-neutral-200 rounded-md"
            >
              <img
                src={img.type === "server" ? img.data.url : img.data}
                alt={img.type === "server" ? img.data.altText || "" : `preview ${index + 1}`}
                className="w-full h-40 object-contain rounded-md"
              />
              <input
                type="checkbox"
                checked={selectedIndexes.includes(index)}
                onChange={() => toggleSelection(index)}
                className="absolute top-1 left-1 h-5 w-5 accent-neutral-800 cursor-pointer"
              />
            </div>
          ))}

          <label
            htmlFor="file-upload"
            className="h-20 w-20 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md p-2 cursor-pointer border-dashed border-neutral-700 border"
          >
            <Plus className="text-neutral-700 h-4 w-4" />
          </label>
        </div>
      )}
    </div>
  );
}
