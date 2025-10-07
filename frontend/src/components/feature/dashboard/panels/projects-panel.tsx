"use client";

import { DashboardEditContainer } from "../dashboard-edit-container";
import ProjectsAddForm from "../../form/dashboard/add-form/projects-form";
import ProjectsEdit from "../edit/projects-edit/projects-edit";
export function ProjectsPanel() {
  return (
    <DashboardEditContainer title="Projects">
      <div className="flex flex-col gap-4">
        <ProjectsAddForm />
        <ProjectsEdit />
      </div>
    </DashboardEditContainer>
  );
}
