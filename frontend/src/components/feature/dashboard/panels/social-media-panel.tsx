import SocialMediaForm from "../../form/dashboard/social-media-form";
import { DashboardEditContainer } from "../dashboard-edit-container";
import SocialMediaEdit from "../edit/social-media-edit";

export function SocialMediaPanel() {
  return (
    <DashboardEditContainer title="Social Media">
      <div className="flex flex-col gap-4">
        <SocialMediaForm mode="add" />
        <SocialMediaEdit />
      </div>
    </DashboardEditContainer>
  );
}