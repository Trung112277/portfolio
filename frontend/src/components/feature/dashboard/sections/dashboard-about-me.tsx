import { DashboardTitle } from "@/components/heading/dashboar-title";
import { DashboardEditContainer } from "../dashboard-edit-container";

export function DashboardAboutMe() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="About Me Management"
        description="Update your personal information, bio, and professional details."
      />

      <DashboardEditContainer title="Personal Information">
        dsds
      </DashboardEditContainer>
    </div>
  );
}
