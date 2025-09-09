import WorkExperienceForm from "@/components/feature/form/dashboard/add-form/work-experience-form";
import { WorkExperienceFormInputs } from "@/types/work-experience-form";
import GenericEditForm from "@/components/feature/form/dashboard/edit-form/generic-edit-form";

interface EditWorkExperienceFormProps {
  workExperienceId: string;
  initialData: Partial<WorkExperienceFormInputs>;
  onUpdate?: (
    id: string,
    data: WorkExperienceFormInputs
  ) => Promise<void>;
}

export default function EditWorkExperienceForm({
  workExperienceId,
  initialData,
  onUpdate,
}: EditWorkExperienceFormProps) {
  return (
    <GenericEditForm
      itemId={workExperienceId}
      initialData={initialData}
      onUpdate={onUpdate}
      formComponent={WorkExperienceForm}
      itemType="work experience"
    />
  );
}