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
import { TECH_LIST } from "@/constant/tech-list";
import { SelectField } from "../../field-form/select-field";

interface TechListEditFormProps {
  techListId: string;
  initialData: Partial<TechListFormInputs>;
}

export default function TechListEditForm({
  techListId,
  initialData,
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

  const handleFormSubmit: SubmitHandler<TechListFormInputs> = async (data) => {
    console.log("Updating tech list:", techListId, data);
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
      console.log("Tech list updated successfully");
      toast.success("Tech list updated successfully");
    } catch (error) {
      console.error("Error updating tech list:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while updating tech list");
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
            options={TECH_LIST.map((tech) => ({
              value: tech.category,
              label: tech.name,
            }))}
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