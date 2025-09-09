import { DashboardTitle } from "@/components/heading/dashboar-title";
import { DashboardEditContainer } from "@/components/feature/dashboard/dashboard-edit-container";
import TechListAddForm from "@/components/feature/form/dashboard/add-form/tech-list-form";

export function DashboardTech() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Tech Stack"
        description="Manage technical skills and tools."
      />

      <DashboardEditContainer title="Tech Set">
        <TechListAddForm />
      </DashboardEditContainer>
    </div>
  );
}
