import { DashboardEditContainer } from "../dashboard-edit-container";
import { WorkExperienceEdit } from "../edit/work-exoerience-edit";

export function WorkExperiencePanel() {
  return (
    <DashboardEditContainer title="Work Experience">
        <div className="flex flex-col gap-4">
        <WorkExperienceEdit />
      </div>
    </DashboardEditContainer>
  );
}