import { DashboardTitle } from "@/components/heading/dashboar-title";
import { IntroductionPanel } from "../panels/introduction-panel";
import { SocialMediaPanel } from "../panels/social-media-panel";
import { PersonalInformationPanel } from "../panels/personal-information-panel";
import { WorkExperiencePanel } from "../panels/work-experience-panel";

export function DashboardAboutMe() {
  return (
    <div className="space-y-6">
      <DashboardTitle
        title="About Me Management"
        description="Update personal information, author, introduction, and social media links."
      />

      <PersonalInformationPanel />

      <IntroductionPanel />

      <SocialMediaPanel />

      <WorkExperiencePanel />
    </div>
  );
}
