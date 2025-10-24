"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import EditButton from "@/components/button/edit-button";
import PrimaryButton from "@/components/button/primary-button";
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
import { ProjectsFormInputs } from "@/types/projects-form";
import { ProjectsService } from "@/services/projects.service";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";

interface ProjectsEditFormProps {
  socialMediaId: string;
  initialData: Partial<ProjectsFormInputs>;
  onUpdate?: (updatedData: ProjectsFormInputs) => void;
  disabled?: boolean;
}

export default function ProjectsEditForm({
  socialMediaId,
  initialData,
  onUpdate,
  disabled = false,
}: ProjectsEditFormProps) {
  const { isOpen, setIsOpen } = useDialogState();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProjectsFormInputs>({
    mode: "onSubmit",
    defaultValues: initialData,
  });

  const { selectedColor, colorText, handleColorChange, handleColorTextChange } =
    useColorSync(watch, setValue);

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<ProjectsFormInputs> = async (data) => {
    console.log("Updating project:", socialMediaId, data);

    try {
      // Call API to update project
      const projectId = parseInt(socialMediaId);
      const updatedProject = await ProjectsService.update(projectId, {
        name: data.name,
        description: data.description,
        link: data.link,
        color: data.color,
      });

      console.log("Project updated successfully:", updatedProject);

      // Reset form and states
      reset(initialData);
      setIsOpen(false);
      
      // Call onUpdate callback with updated data
      if (onUpdate) {
        onUpdate(data);
      }
      
      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while updating project");
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <EditButton onClick={() => setIsOpen(true)} disabled={disabled} />
      
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting} />
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
    
          <TextInputField
            label="Name of the project"
            register={register}
            name="name"
            errors={errors}
            placeholder="Enter name of the project"
            validation={getFieldValidation("name")}
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
            {isSubmitting ? "Updating..." : "Update Project"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}