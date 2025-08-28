import { UseFormRegister, FieldErrors } from "react-hook-form";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SafeImage } from "@/components/ui/safe-image";
import IconButton from "@/components/button/icon-button";
import { SocialMediaFormInputs } from "@/types/social-media-form";

interface ImageUploadFieldProps {
  register: UseFormRegister<SocialMediaFormInputs>;
  errors: FieldErrors<SocialMediaFormInputs>;
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
  
  const extension = fileName.split('.').pop();
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncatedName = nameWithoutExtension.substring(0, maxLength - 3);
  
  return `${truncatedName}...${extension ? `.${extension}` : ''}`;
};

export function ImageUploadField({
  register,
  errors,
  selectedImage,
  imagePreview,
  onImageChange,
  onRemoveImage,
  isSubmitting,
}: ImageUploadFieldProps) {
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

      {selectedImage && imagePreview && (
        <div className="flex justify-center items-center relative w-fit mx-auto">
          <IconButton
            onClick={onRemoveImage}
            className="absolute top-0 right-0 rounded-full border-none bg-transparent hover:bg-transparent w-fit h-fit hover:text-primary z-10"
          >
            <XIcon className="w-4 h-4" />
          </IconButton>
          <SafeImage
            className="border-2 rounded-md p-2 w-[300px] h-[300px] object-cover"
            src={imagePreview}
            alt="Selected image"
            width={100}
            height={100}
          />
        </div>
      )}

      <div className="relative">
        <Input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 max-w-full"
          {...register("image", {
            onChange: handleImageChange,
            validate: (value) => {
              if (!selectedImage) {
                return "Please select an image";
              }
              return true;
            },
          })}
        />
         <div className="flex items-center justify-start w-full h-9 px-3 py-1 text-base border border-input rounded-md bg-transparent text-muted-foreground">
          <span 
            className="truncate" 
            title={selectedImage?.name || "Select image"}
          >
            {selectedImage ? truncateFileName(selectedImage.name) : "Select image"}
          </span>
        </div>
      </div>
      {errors.image && (
        <p className="mt-1 text-sm text-red-600">
          {errors.image.message}
        </p>
      )}
    </div>
  );
}
