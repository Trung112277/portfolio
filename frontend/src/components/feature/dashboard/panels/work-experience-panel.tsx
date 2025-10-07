"use client";

import { DashboardEditContainer } from "@/components/feature/dashboard/dashboard-edit-container";
import { WorkExperienceEdit } from "@/components/feature/dashboard/edit/work-experience-edit/work-experience-edit";
import WorkExperienceForm from "@/components/feature/form/dashboard/add-form/work-experience-form";

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
