"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import AddSocialMediaButton from "@/components/button/add-social-media-button";
import PrimaryButton from "@/components/button/primary-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ImageUploadField } from "../field/image-upload-field";
import { ColorPickerField } from "../field/color-picker-field";
import { TextInputField } from "../field/text-input-field";
import { useColorSync } from "../../../../hooks/useColorSync";

import { SocialMediaFormInputs, SocialMediaFormProps } from "@/types/social-media-form";
import { FORM_CONSTANTS } from "@/constant/form-constants";
import { getFieldValidation } from "@/lib/form-validation";
import { getErrorMessage } from "@/lib/form-utils";

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
  const [internalOpen, setInternalOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
    resetField,
    trigger,
  } = useForm<SocialMediaFormInputs>({
    mode: "onSubmit",
    defaultValues: initialData,
  });

  const { selectedColor, colorText, handleColorChange, handleColorTextChange } =
    useColorSync(watch, setValue);

  // Initialize form with initial data if in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof SocialMediaFormInputs, value);
        }
      });
    }
  }, [mode, initialData, setValue]);

  const handleImageChange = (file: File | null, preview: string | null) => {
    setSelectedImage(file);
    setImagePreview(preview);
    
    // Trigger validation for image field after state update
    setTimeout(() => {
      trigger("image");
    }, FORM_CONSTANTS.TIMING.VALIDATION_DELAY);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    resetField("image");
    
    // Trigger validation for image field after removing image
    setTimeout(() => {
      trigger("image");
    }, FORM_CONSTANTS.TIMING.VALIDATION_DELAY);
  };

  const handleFormSubmit: SubmitHandler<SocialMediaFormInputs> = async (data) => {
    try {
      // Trigger validation for all fields including image
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      if (onSubmit) {
        await onSubmit(data, selectedImage);
      } else {
        // Default behavior for add mode
        console.log("Form submitted, data:", data);
        console.log("Selected image:", selectedImage);
        
        // TODO: Add API call here
        await new Promise((resolve) => setTimeout(resolve, FORM_CONSTANTS.TIMING.API_SIMULATION_DELAY)); // Simulate API call
        console.log("Social media data submitted successfully");
      }

      // Reset form and states
      reset();
      setSelectedImage(null);
      setImagePreview(null);

      // Close dialog
      setIsOpen(false);

      toast.success(
        mode === "edit" 
          ? FORM_CONSTANTS.MESSAGES.SUCCESS.UPDATE 
          : FORM_CONSTANTS.MESSAGES.SUCCESS.ADD
      );
    } catch (error) {
      console.error("Error submitting social media data:", error);
      if (error instanceof Error) {
        toast.error(`${getErrorMessage(mode)}: ${error.message}`);
      } else {
        toast.error(getErrorMessage(mode));
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
    return <AddSocialMediaButton onClick={() => setIsOpen(true)} />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {renderTrigger()}
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
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
              ? (mode === "edit" ? "Updating..." : "Adding...") 
              : (mode === "edit" ? "Update Social Media" : "Add Social Media")
            }
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
