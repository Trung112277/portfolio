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

export default function TechListAddForm() {
  const { isOpen, setIsOpen } = useDialogState();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { createTech } = useTechStack();

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

  const handleFormSubmit: SubmitHandler<TechListFormInputs> = async (data) => {
    console.log("Adding tech list, data:", data);
    console.log("Selected image:", selectedImage);

    try {
      // Create tech stack item in database
      await createTech({
        image_url: selectedImage ? URL.createObjectURL(selectedImage) : "/placeholder-tech.png",
        description: data.name,
        link: "#", // Default link since form doesn't have link field
        color: data.color,
        category: data.category,
      });

      // Reset form and states
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      setIsOpen(false);
      console.log("Tech list added successfully");
      toast.success("Tech list added successfully");
    } catch (error) {
      console.error("Error adding tech list:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while adding tech list");
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <AddItemButton onClick={() => setIsOpen(true)} label="Add Tech List" />

      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting} />
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
            isSubmitting={isSubmitting}
          />

          <TextInputField
            label="Name Tech"
            register={register}
            name="name"
            errors={errors}
            placeholder="Enter tech name"
            validation={getFieldValidation("name")}
            isSubmitting={isSubmitting}
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
            {isSubmitting ? "Adding..." : "Add Tech List"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
