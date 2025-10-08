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
import { SocialMediaFormInputs } from "@/types/social-media-form";
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";

interface SocialMediaEditFormProps {
  socialMediaId: string;
  initialData: Partial<SocialMediaFormInputs>;
}

export default function SocialMediaEditForm({
  socialMediaId,
  initialData,
}: SocialMediaEditFormProps) {
  const { isOpen, setIsOpen } = useDialogState();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SocialMediaFormInputs>({
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
      setImagePreview(null);
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

  const handleFormSubmit: SubmitHandler<SocialMediaFormInputs> = async (data) => {
    console.log("Updating social media:", socialMediaId, data);
    console.log("Selected image:", selectedImage);

    try {
      // TODO: Replace with actual API call
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    

      // Reset form and states
      reset(initialData);
      setSelectedImage(null);
      setImagePreview(null);
      setIsOpen(false);
      console.log("Social media updated successfully");
      toast.success("Social media updated successfully");
    } catch (error) {
      console.error("Error updating social media:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while updating social media");
      }
    }
  };

  // Helper function to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
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
      setImagePreview(null);
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
            <DialogTitle>Edit Social Media</DialogTitle>
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
            label="Description"
            register={register}
            name="description"
            errors={errors}
            placeholder="Enter description"
            validation={getFieldValidation("description")}
            isSubmitting={isSubmitting}
          />

          <TextInputField
            label="Link"
            register={register}
            name="link"
            errors={errors}
            placeholder="Enter URL"
            validation={getFieldValidation("link")}
            isSubmitting={isSubmitting}
            type="url"
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
            {isSubmitting ? "Updating..." : "Update Social Media"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}