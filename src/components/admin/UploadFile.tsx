import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Plus } from "lucide-react";
import { CreateVariantForm, VariantImage } from "@/types";

type UploadFileProps = {
  setValue: UseFormSetValue<CreateVariantForm>;
  watchFiles: File[] | undefined;
  variantImages?: VariantImage[];
};

export default function UploadFile({ setValue, watchFiles, variantImages = [] }: UploadFileProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    images.forEach((url) => URL.revokeObjectURL(url));

    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);

    const currentFiles = watchFiles ? Array.from(watchFiles) : [];
    setValue("images", [...currentFiles, ...files], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const toggleSelection = (index: number) => {
    setSelectedIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const deleteSelected = () => {
    const newImages = images.filter((_, idx) => !selectedIndexes.includes(idx));
    const newFiles = watchFiles?.filter((_, idx) => !selectedIndexes.includes(idx)) || [];

    selectedIndexes.forEach((idx) => {
      URL.revokeObjectURL(images[idx]);
    });

    setImages(newImages);
    setSelectedIndexes([]);
    setValue("images", newFiles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between">
        <h2 className="font-semibold">Media</h2>
        {selectedIndexes.length > 0 && (
          <button onClick={deleteSelected} className="text-sm cursor-pointer text-red-800 font-medium hover:underline">
            Delete selection
          </button>
        )}
      </div>
      <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />

      {images.length < 1 && variantImages.length < 1 ? (
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
        <>
          <div className="grid grid-cols-3 gap-2 mt-2 max-w-full">
            {variantImages.map((image, index) => (
              <div key={image.id} className="relative border border-neutral-200 rounded-md">
                <img src={image.url} alt={image.altText || ""} className="w-full h-40 object-contain rounded-md" />
                <input
                  type="checkbox"
                  checked={selectedIndexes.includes(index)}
                  onChange={() => toggleSelection(index)}
                  className="absolute top-1 left-1 h-5 w-5 accent-neutral-800 cursor-pointer"
                />
              </div>
            ))}
            {images.map((src, index) => (
              <div key={index} className="relative border border-neutral-200 rounded-md">
                <img src={src} alt={`preview ${index + 1}`} className="w-full h-40 object-contain rounded-md" />
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
        </>
      )}
    </div>
  );
}
