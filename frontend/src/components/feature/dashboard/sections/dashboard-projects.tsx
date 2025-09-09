import { DashboardTitle } from "@/components/heading/dashboar-title";
import { ProjectsPanel } from "../panels/projects-panel";
export function DashboardProjects() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Projects"
        description="Manage projects and showcase my work."
      />
      <ProjectsPanel />
    </div>
  );
}
