"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AddItemButton from "@/components/button/add-item-button";
import PrimaryButton from "@/components/button/primary-button";
import { ImageUploadField } from "@/components/feature/form/field-form/image-upload-field";
import { ColorPickerField } from "@/components/feature/form/field-form/color-picker-field";
import { useColorSync } from "@/hooks/useColorSync";
import { useDialogState } from "@/hooks/useDialogState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TechListFormInputs } from "@/types/tech-list-form";
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { SelectField } from "@/components/feature/form/field-form/select-field";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";
import { useTechStack } from "@/hooks/useTechStack";
import { useImageUpload } from "@/hooks/useImageUpload";

export default function TechListAddForm() {
  const { isOpen, setIsOpen } = useDialogState();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { createTech } = useTechStack();
  const { uploadImage, isUploading, error: uploadError, clearError } = useImageUpload();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<TechListFormInputs>({
    mode: "onSubmit",
  });

  const { selectedColor, colorText, handleColorChange, handleColorTextChange } =
    useColorSync(watch, setValue);

  const handleImageChange = (file: File | null, preview: string | null) => {
    setSelectedImage(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // Clear upload error when dialog opens
  const handleDialogOpen = (open: boolean) => {
    if (open) {
      clearError();
    }
    setIsOpen(open);
  };

  const handleFormSubmit: SubmitHandler<TechListFormInputs> = async (data) => {
    try {
      console.log('Starting form submission with data:', data);
      
      let imageUrl = "/placeholder-tech.png";
      
      if (selectedImage) {
        console.log('Processing image upload...', {
          fileName: selectedImage.name,
          fileSize: selectedImage.size,
          fileType: selectedImage.type
        });

        // Upload image to Supabase Storage
        const uploadResult = await uploadImage(selectedImage, {
          folder: 'tech-stack',
          compress: true
        });
        
        if (!uploadResult) {
          throw new Error(uploadError || 'Image upload failed');
        }
        
        console.log('Image upload successful:', uploadResult);
        imageUrl = uploadResult.url;
      }

      console.log('Creating tech stack item with:', {
        image_url: imageUrl,
        name: data.name,
        color: data.color,
        category: data.category,
      });

      // Create tech stack item in database
      const createdTech = await createTech({
        image_url: imageUrl,
        name: data.name,
        color: data.color,
        category: data.category,
      });

      console.log('Tech stack item created successfully:', createdTech);

      // Reset form and states
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      setIsOpen(false);
      toast.success("Tech list added successfully");
    } catch (error) {
      console.error('Form submission error:', error);
      
      if (error instanceof Error) {
        // More specific error messages
        if (error.message.includes('Authentication required')) {
          toast.error("Please log in to add tech stack items");
        } else if (error.message.includes('row-level security policy')) {
          toast.error("Permission denied. Please check your account permissions.");
        } else if (error.message.includes('duplicate key')) {
          toast.error("A tech stack item with this name already exists.");
        } else if (error.message.includes('Image upload failed')) {
          toast.error("Failed to upload image. Please try again.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
      } else {
        toast.error("An error occurred while adding tech list");
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    handleDialogOpen(open);
    if (!open) {
      reset();
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <AddItemButton onClick={() => setIsOpen(true)} label="Add Tech" />

      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting || isUploading} />
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Add Tech List</DialogTitle>
          </DialogHeader>

          <ImageUploadField
            register={register}
            errors={errors}
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            isSubmitting={isSubmitting || isUploading}
          />

          <TextInputField
            label="Name Tech"
            register={register}
            name="name"
            errors={errors}
            placeholder="Enter tech name"
            validation={getFieldValidation("name")}
            isSubmitting={isSubmitting || isUploading}
            type="text"
          />

          <SelectField
            label="Category"
            name="category"
            errors={errors}
            control={control}
            options={[
              { value: "frontend", label: "Frontend" },
              { value: "backend", label: "Backend" },
              { value: "database", label: "Database" },
              { value: "devops", label: "DevOps" },
            ]}
            validation={getFieldValidation("category")}
            isSubmitting={isSubmitting || isUploading}
            placeholder="Select category"
          />

          <ColorPickerField
            register={register}
            errors={errors}
            selectedColor={selectedColor}
            colorText={colorText}
            onColorChange={handleColorChange}
            onColorTextChange={handleColorTextChange}
            validation={getFieldValidation("color")}
            isSubmitting={isSubmitting || isUploading}
          />

          <PrimaryButton type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting || isUploading ? (isUploading ? "Uploading..." : "Adding...") : "Add Tech List"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
