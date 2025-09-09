"use client";

import { useState, useEffect } from "react";
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
import {
  SocialMediaFormInputs,
  SocialMediaFormProps,
} from "@/types/social-media-form";
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";

export default function SocialMediaForm({
  mode = "add",
  initialData,
  onSubmit,
  onCancel,
  open,
  onOpenChange,
}: SocialMediaFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { isOpen, setIsOpen } = useDialogState(open, onOpenChange);

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
  const methods = useForm({
    mode: "onChange",
  });

  const { selectedColor, colorText, handleColorChange, handleColorTextChange } =
    useColorSync(watch, setValue);

  // Reset form when initialData changes (important for edit mode)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      // Reset image states when editing
      if (mode === "edit") {
        setSelectedImage(null);
        setImagePreview(null);
      }
    }
  }, [initialData, reset, mode]);

  const handleImageChange = (file: File | null, preview: string | null) => {
    setSelectedImage(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleFormSubmit: SubmitHandler<SocialMediaFormInputs> = async (
    data
  ) => {
    // Always log form data for debugging
    console.log("Form submitted, data:", data);
    console.log("Selected image:", selectedImage);

    try {
      if (onSubmit) {
        await onSubmit(data, selectedImage);
      } else {
        // Default behavior
        // TODO: Add API call here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      }

      // Always show success message in console
      console.log("Social media data submitted successfully");

      // Reset form and states
      reset();
      setSelectedImage(null);
      setImagePreview(null);

      // Only close dialog if not controlled by parent (i.e., in add mode)
      if (mode === "add") {
        setIsOpen(false);
      }

      toast.success(
        mode === "edit"
          ? "Social media updated successfully"
          : "Social media added successfully"
      );
    } catch (error) {
      console.error("Error submitting social media data:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleClose = () => {
    if (onCancel) {
      onCancel();
    } else {
      setIsOpen(false);
    }
  };

  const renderTrigger = () => {
    if (mode === "edit") {
      return null; // Edit mode doesn't need a trigger button
    }
    return (
      <AddItemButton onClick={() => setIsOpen(true)} label="Add Social Media" />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {renderTrigger()}
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Edit Social Media" : "Add Social Media"}
            </DialogTitle>
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
            {isSubmitting
              ? mode === "edit"
                ? "Updating..."
                : "Adding..."
              : mode === "edit"
              ? "Update Social Media"
              : "Add Social Media"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
