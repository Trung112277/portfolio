import { DashboardEditContainer } from "../dashboard-edit-container";
import { WorkExperienceEdit } from "../edit/work-exoerience-edit";
import WorkExperienceForm from "../../form/dashboard/work-experience-form";

export function WorkExperiencePanel() {
  return (
    <DashboardEditContainer title="Work Experience">
        <div className="flex flex-col gap-4">
          <WorkExperienceForm />
        <WorkExperienceEdit />
      </div>
    </DashboardEditContainer>
  );
}