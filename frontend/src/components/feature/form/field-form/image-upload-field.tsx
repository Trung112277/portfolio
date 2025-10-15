import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafeImage } from "@/components/ui/safe-image";
import IconButton from "@/components/button/icon-button";

interface ImageUploadFieldProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  selectedImage: File | null;
  imagePreview: string | null;
  onImageChange: (file: File | null, preview: string | null) => void;
  onRemoveImage: () => void;
  isSubmitting: boolean;
}

const truncateFileName = (fileName: string, maxLength: number = 25) => {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const extension = fileName.split(".").pop();
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));
  const truncatedName = nameWithoutExtension.substring(0, maxLength - 3);

  return `${truncatedName}...${extension ? `.${extension}` : ""}`;
};

const getImageNameFromPreview = (imagePreview: string | null): string => {
  if (!imagePreview) return "Select image";
  
  // If it's a data URL (base64), generate a name
  if (imagePreview.startsWith('data:image/')) {
    const mimeType = imagePreview.split(';')[0].split('/')[1];
    return `current-image.${mimeType}`;
  }
  
  // If it's a URL, try to extract filename
  if (imagePreview.startsWith('http') || imagePreview.startsWith('/')) {
    const urlParts = imagePreview.split('/');
    const filename = urlParts[urlParts.length - 1];
    return filename || "current-image.jpg";
  }
  
  return "current-image.jpg";
};

export function ImageUploadField<T extends FieldValues>({
  register,
  errors,
  selectedImage,
  imagePreview,
  onImageChange,
  onRemoveImage,
}: ImageUploadFieldProps<T>) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(file, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg text-primary">Image</Label>

      {imagePreview && (
        <div className="flex justify-center items-center relative w-fit mx-auto">
          <IconButton
            onClick={onRemoveImage}
            className="absolute top-0 right-0 rounded-full border-none bg-transparent hover:bg-transparent w-fit h-fit hover:text-primary z-10"
          >
            <XIcon className="w-4 h-4" />
          </IconButton>
          <SafeImage
            className="border-2 rounded-md p-2 object-cover"
            src={imagePreview}
            alt="Selected image"
            width={200}
            height={200}
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      )}

      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 max-w-full"
          {...register("image" as Path<T>, {
            onChange: handleImageChange,
            validate: (value: FileList) => {
              // If there's a selected image or an existing image preview, it's valid
              if (selectedImage || imagePreview) {
                return true;
              }
              // Only require selection if there's no existing image
              return value && value.length > 0
                ? true
                : "Please select an image";
            },
          })}
        />
        <div
          className={`flex items-center justify-start w-full h-9 px-3 py-1 text-base border border-input rounded-md bg-transparent text-muted-foreground ${
            errors.image ? "border-red-500" : ""
          }`}
        >
          <span
            className="truncate"
            title={selectedImage?.name || getImageNameFromPreview(imagePreview)}
          >
            {selectedImage
              ? truncateFileName(selectedImage.name)
              : truncateFileName(getImageNameFromPreview(imagePreview))}
          </span>
        </div>
      </div>
      {errors.image && (
        <p className="text-sm text-red-600">{errors.image.message as string}</p>
      )}
    </div>
  );
}