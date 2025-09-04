import WorkExperienceForm from "../add-form/work-experience-form";
import { WorkExperienceFormInputs } from "@/types/work-experience-form";
import GenericEditForm from "./generic-edit-form";

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