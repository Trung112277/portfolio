import SocialMediaForm from "@/components/feature/form/dashboard/add-form/social-media-form";
import { DashboardEditContainer } from "@/components/feature/dashboard/dashboard-edit-container";
import SocialMediaEdit from "@/components/feature/dashboard/edit/social-media-edit/social-media-edit";

export function SocialMediaPanel() {
  return (
    <DashboardEditContainer title="Social Media">
      <div className="flex flex-col gap-4">
        <SocialMediaForm />
        <SocialMediaEdit />
      </div>
    </DashboardEditContainer>
  );
}