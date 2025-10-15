"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import AddItemButton from "@/components/button/add-item-button";
import PrimaryButton from "@/components/button/primary-button";
import { useDialogState } from "@/hooks/useDialogState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkExperienceFormInputs } from "@/types/work-experience-form";
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { TextareaField } from "@/components/feature/form/field-form/textarea-field";
import { SelectField } from "@/components/feature/form/field-form/select-field";
import YearField from "@/components/feature/form/field-form/year-field";
import { WORK_ARRANGEMENT_OPTIONS } from "@/constant/work-arrangement-options";
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";
import { useWorkExperience } from "@/hooks/useWorkExperience";

export default function WorkExperienceAddForm() {
  const { isOpen, setIsOpen } = useDialogState();
  const { createWorkExperience } = useWorkExperience();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WorkExperienceFormInputs>({
    mode: "onSubmit",
  });

  const handleFormSubmit: SubmitHandler<WorkExperienceFormInputs> = async (data) => {
    console.log("Adding work experience, data:", data);

    try {
      // Validate that start year is not after end year (allows equal years)
      if (parseInt(data.startYear) > parseInt(data.endYear)) {
        toast.error("Start year cannot be after end year");
        return;
      }

      // Transform form data to match API schema
      const apiData = {
        position: data.position.trim(),
        company_name: data.companyName.trim(),
        start_year: parseInt(data.startYear), // Convert to number
        end_year: parseInt(data.endYear),     // Convert to number
        work_arrangement: data.workArrangement,
        tech_stack: data.techStack.trim().split(' ').map(tech => tech.trim()).filter(tech => tech.length > 0), // Convert to array
        description: data.description.trim(),
      };

      console.log("API data being sent:", apiData);

      await createWorkExperience(apiData);
      
      console.log("Work experience added successfully");

      // Reset form
      reset();
      setIsOpen(false);
      
      // Small delay to ensure dialog is closed before showing toast
      setTimeout(() => {
        toast.success("Work experience added successfully");
      }, 100);
    } catch (error) {
      console.error("Error adding work experience:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while adding work experience");
      }
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (isSubmitting) {
      return;
    }
    setIsOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <AddItemButton
        onClick={() => setIsOpen(true)}
        label="Add Work Experience"
      />
      
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting} />
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Add Work Experience</DialogTitle>
          </DialogHeader>

          <TextInputField
            label="Position"
            register={register}
            name="position"
            errors={errors}
            placeholder="Enter Position"
            validation={getFieldValidation("position")}
            isSubmitting={isSubmitting}
          />

          <TextInputField
            label="Company Name"
            register={register}
            name="companyName"
            errors={errors}
            placeholder="Enter Company Name"
            validation={getFieldValidation("companyName")}
            isSubmitting={isSubmitting}
          />

            <YearField
              label="Year Range"
              register={register}
              startYearName="startYear"
              endYearName="endYear"
              errors={errors}
              placeholder="Start Year (e.g., 2022)"
              secondaryPlaceholder="End Year (e.g., 2023)"
              startYearValidation={getFieldValidation("startYear")}
              endYearValidation={getFieldValidation("endYear")}
              isSubmitting={isSubmitting}
              type="text"
            />

          <SelectField
            label="Work Arrangement"
            control={control}
            name="workArrangement"
            errors={errors}
            options={WORK_ARRANGEMENT_OPTIONS}
            validation={getFieldValidation("workArrangement")}
            isSubmitting={isSubmitting}
            placeholder="Select work arrangement"
          />

          <TextInputField
            label="Tech Stack"
            register={register}
            name="techStack"
            errors={errors}
            placeholder="Enter Tech Stack (space-separated, e.g., React TypeScript Node.js)"
            validation={getFieldValidation("techStack")}
            isSubmitting={isSubmitting}
          />

          <TextareaField
            label="Description"
            register={register}
            name="description"
            errors={errors}
            placeholder="Describe your role and achievements..."
            validation={getFieldValidation("description")}
            isSubmitting={isSubmitting}
            rows={4}
          />

          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Work Experience"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}