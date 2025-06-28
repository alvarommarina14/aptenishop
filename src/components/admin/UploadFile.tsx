import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Plus } from "lucide-react";
import { CreateVariantForm } from "@/types";

type UploadFileProps = {
  setValue: UseFormSetValue<CreateVariantForm>;
  watchFiles: File[] | undefined;
};

export default function UploadFile({ setValue, watchFiles }: UploadFileProps) {
  const [images, setImages] = useState<string[]>([]);

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

  return (
    <>
      <input id="file-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFiles} />

      {images.length < 1 ? (
        <div className="min-w-[400px] w-full bg-gray-100 h-[200px] border-dashed border-neutral-700 border rounded-md flex flex-col items-center justify-center">
          <label
            htmlFor="file-upload"
            className="bg-white hover:bg-gray-50 rounded-md text-xs font-semibold p-2 shadow-md cursor-pointer"
          >
            Upload new
          </label>
          <p className="text-xs text-neutral-700 mt-2">Only accepts images</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 mt-4 max-w-full">
          {images.map((src, index) => (
            <div key={index} className="border border-neutral-200 rounded-md">
              <img src={src} alt={`preview ${index + 1}`} className="w-full h-40 object-contain rounded-md" />
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
    </>
  );
}
