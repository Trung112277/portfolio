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
import { SocialMediaFormInputs } from "@/types/social-media-form";
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";

export default function SocialMediaAddForm() {
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

  const handleFormSubmit: SubmitHandler<SocialMediaFormInputs> = async (data) => {
    console.log("=== FORM SUBMIT START ===");
    console.log("Adding social media, data:", data);
    console.log("Selected image:", selectedImage);

    try {
      let imageUrl = "";
      
      // Upload image if selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('bucket', 'social-media');
        formData.append('folder', 'social-media-images');
        
        const uploadResponse = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
      }

      // Create social media entry
      const response = await fetch('/api/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: imageUrl,
          description: data.description,
          link: data.link,
          color: data.color,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create social media');
      }
     
      // Reset form and states
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      setIsOpen(false);
      console.log("=== TOAST SUCCESS CALLED ===");
      toast.success("Social media added successfully", {
        id: `social-media-add-${Date.now()}`
      });
    } catch (error) {
      console.error("Error adding social media:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while adding social media");
      }
    }
  };


  const handleDialogClose = (open: boolean) => {
    if (isSubmitting) {
      return;
    }
    setIsOpen(open);
    if (!open) {
      // Reset form when dialog is closed
      reset();
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <AddItemButton onClick={() => setIsOpen(true)} label="Add Social Media" />
      
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting} />
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add Social Media</DialogTitle>
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
            {isSubmitting ? "Adding..." : "Add Social Media"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}