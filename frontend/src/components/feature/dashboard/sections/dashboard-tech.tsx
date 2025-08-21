import { DashboardTitle } from "@/components/heading/dashboar-title";
import { DashboardEditContainer } from "../dashboard-edit-container";

export function DashboardTech() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Tech Stack"
        description="Manage your technical skills and tools."
      />

      <DashboardEditContainer title="Tech Stack">dsds</DashboardEditContainer>
    </div>
  );
}
