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
import { LoadingOverlay } from "@/components/feature/loading/loading-overlay";
import { useWorkExperience } from "@/hooks/useWorkExperience";
import { useUserRole } from "@/hooks/useUserRole";
import { checkAdminPermission, PermissionActions } from "@/lib/permission-utils";

interface WorkExperienceEditFormProps {
  workExperienceId: string;
  initialData: Partial<WorkExperienceFormInputs>;
  disabled?: boolean;
}

export default function WorkExperienceEditForm({
  workExperienceId,
  initialData,
  disabled = false,
}: WorkExperienceEditFormProps) {
  const { isOpen, setIsOpen } = useDialogState();
  const { updateWorkExperience } = useWorkExperience();
  const { isAdmin } = useUserRole();
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
    // Check admin permission before submitting
    const permission = checkAdminPermission(isAdmin, PermissionActions.UPDATE);
    if (!permission.hasPermission) {
      return; // Toast is already shown by checkAdminPermission
    }

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

      await updateWorkExperience(workExperienceId, apiData);

      setIsOpen(false);

      // Small delay to ensure dialog is closed before showing toast
      setTimeout(() => {
        toast.success("Work experience updated successfully");
      }, 100);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An error occurred while updating work experience");
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
      <EditButton onClick={() => setIsOpen(true)} disabled={disabled} />
      
      <DialogContent
        aria-describedby={undefined}
        className="overflow-y-auto max-h-[90vh]"
      >
        <LoadingOverlay isLoading={isSubmitting} />
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
            {isSubmitting ? "Updating..." : "Update Work Experience"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}