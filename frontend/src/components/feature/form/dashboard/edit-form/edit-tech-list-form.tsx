"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import EditButton from "@/components/button/edit-button";
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
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { TechListFormInputs } from "@/types/tech-list-form";
import { SelectField } from "../../field-form/select-field";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";
import { ImageUploadService } from "@/services/image-upload.service";

interface TechListEditFormProps {
  techListId: string;
  initialData: Partial<TechListFormInputs>;
  onUpdate?: (updatedData: TechListFormInputs) => Promise<void>;
}

export default function TechListEditForm({
  techListId,
  initialData,
  onUpdate,
}: TechListEditFormProps) {
  const { isOpen, setIsOpen } = useDialogState();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<TechListFormInputs>({
    mode: "onSubmit",
    defaultValues: initialData,
  });

  const { selectedColor, colorText, handleColorChange, handleColorTextChange } =
    useColorSync(watch, setValue);

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedImage(null);
      // Set image preview to current image if available
      setImagePreview(initialData.image_url || null);
    }
  }, [initialData, reset]);

  const handleImageChange = (file: File | null, preview: string | null) => {
    setSelectedImage(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFormSubmit: SubmitHandler<TechListFormInputs> = async (data) => {
    try {
      let imageUrl = data.image_url || "/placeholder-tech.png";
      
      if (selectedImage) {
        try {
          // Validate file first
          const validation = ImageUploadService.validateFileDetailed(selectedImage);
          if (!validation.isValid) {
            throw new Error(validation.error);
          }

          // Try to upload to Supabase Storage first
          const uploadResult = await ImageUploadService.uploadImage(selectedImage, {
            folder: 'tech-stack',
            compress: true
          });
          imageUrl = uploadResult.url;
        } catch (storageError) {
          console.warn('Storage upload failed, falling back to base64:', storageError);
          // Fallback to base64 if storage fails
          imageUrl = await convertFileToBase64(selectedImage);
        }
      } else if (data.image_url) {
        // Keep current image if no new image selected
        imageUrl = data.image_url;
      }

      // Add delay for testing LoadingOverlay
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Call the onUpdate callback if provided
      if (onUpdate) {
        await onUpdate({ ...data, image_url: imageUrl });
      } else {
        // TODO: Replace with actual API call
        console.log("Simulating API call...");
      }

      // Reset form and states
      reset(initialData);
      setSelectedImage(null);
      setImagePreview(null);
      setIsOpen(false);
      toast.success("Tech list updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while updating tech list");
      }
    }
  };


  const handleDialogClose = (open: boolean) => {
    if (isSubmitting) {
      return;
    }
    setIsOpen(open);
    if (!open) {
      // Reset form to initial data when dialog is closed
      reset(initialData);
      setSelectedImage(null);
      setImagePreview(initialData.image_url || null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <EditButton onClick={() => setIsOpen(true)} />
      
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting} />
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit Tech List</DialogTitle>
          </DialogHeader>

          <ImageUploadField
            register={register}
            errors={errors}
            selectedImage={selectedImage}
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            isSubmitting={isSubmitting}
          />

          <TextInputField
            label="Name Tech"
            register={register}
            name="name"
            errors={errors}
            placeholder="Enter name tech"
            validation={getFieldValidation("name")}
            isSubmitting={isSubmitting}
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
            isSubmitting={isSubmitting}
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
            isSubmitting={isSubmitting}
          />

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Tech List"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}