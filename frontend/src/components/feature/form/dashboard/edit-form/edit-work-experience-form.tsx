"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import EditButton from "@/components/button/edit-button";
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



interface WorkExperienceEditFormProps {
  workExperienceId: string;
  initialData: Partial<WorkExperienceFormInputs>;
}

export default function WorkExperienceEditForm({
  workExperienceId,
  initialData,
}: WorkExperienceEditFormProps) {
  const { isOpen, setIsOpen } = useDialogState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WorkExperienceFormInputs>({
    mode: "onSubmit",
    defaultValues: {
      ...initialData,
      workArrangement: initialData?.workArrangement ?? undefined,
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        workArrangement: initialData?.workArrangement ?? undefined,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<WorkExperienceFormInputs> = async (data) => {
    console.log("Updating work experience:", workExperienceId, data);

    try {
      // TODO: Replace with actual API call
      // Simulate API call delay to show submitting effect
      await new Promise(resolve => setTimeout(resolve, 1000));
     
      console.log("Work experience updated successfully");

      setIsOpen(false);

      toast.success("Work experience updated successfully");
    } catch (error) {
      console.error("Error updating work experience:", error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while updating work experience");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <EditButton onClick={() => setIsOpen(true)} />
      
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Edit Work Experience</DialogTitle>
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
            label="Year"
            register={register}
            name="year"
            errors={errors}
            placeholder="Start Year"
            secondaryPlaceholder="End Year"
            validation={getFieldValidation("year")}
            isSubmitting={isSubmitting}
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
            placeholder="Enter Tech Stack"
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
            {isSubmitting ? "Updating..." : "Update Work Experience"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}