"use client";

import { DashboardTitle } from "@/components/heading/dashboar-title";
import { IntroductionPanel } from "@/components/feature/dashboard/panels/introduction-panel";
import { SocialMediaPanel } from "@/components/feature/dashboard/panels/social-media-panel";
import { PersonalInformationPanel } from "@/components/feature/dashboard/panels/personal-information-panel";
import { WorkExperiencePanel } from "@/components/feature/dashboard/panels/work-experience-panel";

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
