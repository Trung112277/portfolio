import { DashboardTitle } from "@/components/heading/dashboar-title";
import { DashboardEditContainer } from "../dashboard-edit-container";
import AuthorEditForm from "../../form/dashboard/author-edit-form";
import PrimaryButton from "@/components/button/primary-button";
import { PlusIcon } from "lucide-react";
import SocialMediaEdit from "../../form/dashboard/social-media-edit";

export function DashboardAboutMe() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="About Me Management"
        description="Update personal information, bio, and professional details."
      />

      <DashboardEditContainer title="Personal Information">
        <AuthorEditForm />
      </DashboardEditContainer>
      <DashboardEditContainer title="Social Media">
        <div className="flex flex-col gap-4">
          <PrimaryButton>
            <PlusIcon className="w-4 h-4" />
            Add Social Media
          </PrimaryButton>
          <SocialMediaEdit />
        </div>
      </DashboardEditContainer>
    </div>
  );
}
