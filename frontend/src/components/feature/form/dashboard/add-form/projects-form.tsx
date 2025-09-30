"use client";

import { useForm, SubmitHandler } from "react-hook-form";
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
import { ProjectsService } from "@/services/projects";

export default function ProjectsAddForm() {
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
  });

  const { selectedColor, colorText, handleColorChange, handleColorTextChange } =
    useColorSync(watch, setValue);

  const handleFormSubmit: SubmitHandler<ProjectsFormInputs> = async (data) => {
    console.log("Adding project, data:", data);

    try {
      /const handleSubmit = async (data: ProjectFormData) => {
        try {
          setIsSubmitting(true)
          
          // Upload image to Supabase Storage if needed
          let imageUrl = data.image_url
          if (data.image_file) {
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('project-images')
              .upload(`${Date.now()}-${data.image_file.name}`, data.image_file)
            
            if (uploadError) throw uploadError
            
            const { data: { publicUrl } } = supabase.storage
              .from('project-images')
              .getPublicUrl(uploadData.path)
            
            imageUrl = publicUrl
          }
      
          // Create project
          const project = await ProjectsService.create({
            title: data.title,
            description: data.description,
            image_url: imageUrl,
            tech_stack: data.tech_stack,
            github_url: data.github_url,
            live_url: data.live_url,
          })
      
          toast.success('Project created successfully!')
          onSuccess?.(project)
        } catch (error) {
          console.error('Error creating project:', error)
          toast.error('Failed to create project')
        } finally {
          setIsSubmitting(false)
        }
      }
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
     
      // Reset form and states
      reset();
      setIsOpen(false);
      console.log("Project added successfully");
      toast.success("Project added successfully");
    } catch (error) {
      console.error("Error adding projects:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while adding project");
      }
    }
  };


  const handleDialogClose = (open: boolean) => {
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
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