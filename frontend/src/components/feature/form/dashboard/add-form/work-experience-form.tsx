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
import {
  WorkExperienceFormInputs,
  WorkExperienceFormProps,
} from "@/types/work-experience-form";
import { getFieldValidation } from "@/lib/form-validation";
import { TextInputField } from "@/components/feature/form/field-form/text-input-field";
import { TextareaField } from "@/components/feature/form/field-form/textarea-field";
import { SelectField } from "@/components/feature/form/field-form/select-field";
import YearField from "@/components/feature/form/field-form/year-field";

const WORK_ARRANGEMENT_OPTIONS = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Freelance", label: "Freelance" },
  { value: "Internship", label: "Internship" },
];

export default function WorkExperienceForm({
  mode = "add",
  initialData,
  onSubmit,
  onCancel,
  open,
  onOpenChange,
}: WorkExperienceFormProps) {
  const { isOpen, setIsOpen } = useDialogState(open, onOpenChange);

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

  const handleFormSubmit: SubmitHandler<WorkExperienceFormInputs> = async (
    data
  ) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior
        console.log("Form submitted, data:", data);

        // TODO: Add API call here
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        console.log("Work experience data submitted successfully");
      }

      // Reset form
      reset();

      // Close dialog
      setIsOpen(false);

      toast.success(
        mode === "edit"
          ? "Work experience updated successfully"
          : "Work experience added successfully"
      );
    } catch (error) {
      console.error("Error submitting work experience data:", error);
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
      <AddItemButton
        onClick={() => setIsOpen(true)}
        label="Add Work Experience"
      />
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
              {mode === "edit" ? "Edit Work Experience" : "Add Work Experience"}
            </DialogTitle>
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
            {isSubmitting
              ? mode === "edit"
                ? "Updating..."
                : "Adding..."
              : mode === "edit"
              ? "Update Work Experience"
              : "Add Work Experience"}
          </PrimaryButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
