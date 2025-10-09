"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AddItemButton from "@/components/button/add-item-button";
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
import { ProjectsFormInputs } from "@/types/projects-form";
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { useProjects } from "@/hooks/useProjects";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";
import { useEffect, useRef } from "react";

export default function ProjectsAddForm() {
  const { isOpen, setIsOpen } = useDialogState();
  const { createProject } = useProjects();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const {
    register,
    handleSubmit: handleSubmitForm,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProjectsFormInputs>({
    mode: "onSubmit",
  });

  const { selectedColor, colorText, handleColorChange, handleColorTextChange } =
    useColorSync(watch, setValue);

    const handleSubmit = async (data: ProjectsFormInputs) => {
      try {
        const project = await createProject({
          name: data.name,
          description: data.description,
          link: data.link,
          color: data.color,
        })
    
        console.log('Project created successfully:', project)
        toast.success('Project created successfully!')
        reset() // Reset form after successful creation
        setIsOpen(false)
      } catch (error) {
        console.error('Error creating project:', error)
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`)
        } else {
          toast.error('Failed to create project')
        }
      }
    }

  const handleDialogClose = (open: boolean) => {
    if (isSubmitting) {
      return;
    }
    setIsOpen(open);
    if (!open) {
      // Reset form when dialog is closed
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <AddItemButton onClick={() => setIsOpen(true)} label="Add Project" />

      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting} />
        <form
          onSubmit={handleSubmitForm(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
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
            {isSubmitting ? "Adding..." : "Add Project"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
