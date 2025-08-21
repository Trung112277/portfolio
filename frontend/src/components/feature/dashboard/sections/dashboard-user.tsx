import { DashboardTitle } from "@/components/heading/dashboar-title";
import { DashboardEditContainer } from "../dashboard-edit-container";

export function DashboardUser() {
  return (
    <div className="space-y-6">
    <DashboardTitle title="User Management" description="Manage user information and settings." />

    <DashboardEditContainer title="User">
      dsds
    </DashboardEditContainer>
  </div>
  )
}