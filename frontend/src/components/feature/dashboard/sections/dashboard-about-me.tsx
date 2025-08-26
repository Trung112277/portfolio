import { DashboardTitle } from "@/components/heading/dashboar-title";
import { DashboardEditContainer } from "../dashboard-edit-container";
import AuthorEditForm from "../../form/dashboard/author-edit-form";
import SocialMediaEdit from "./social-media-edit";
import IntroductionEditForm from "../../form/dashboard/introduction-edit-form";
import { TextStyleButton } from "@/components/button/text-style-button";
import SocialMediaForm from "../../form/dashboard/social-medie-form";

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
      <DashboardEditContainer title="Introduction">
        <TextStyleButton />
        <IntroductionEditForm />
      </DashboardEditContainer>
      <DashboardEditContainer title="Social Media">
        <div className="flex flex-col gap-4">
          <SocialMediaForm />
          <SocialMediaEdit />
        </div>
      </DashboardEditContainer>
    </div>
  );
}
