import { DashboardTitle } from "@/components/heading/dashboar-title";
import { TechListPanel } from "../panels/tech-list-panel";

export function DashboardTech() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Tech Stack"
        description="Manage technical skills and tools."
      />

      <TechListPanel />
    </div>
  );
}
