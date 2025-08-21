import { DashboardTitle } from "@/components/heading/dashboar-title";
import { DashboardEditContainer } from "../dashboard-edit-container";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="Dashboard Overview"
        description="Welcome to your portfolio dashboard. Manage your content and track your progress."
      />

      <DashboardEditContainer title="Overview">
        dsds
      </DashboardEditContainer>
    </div>
  );
}
