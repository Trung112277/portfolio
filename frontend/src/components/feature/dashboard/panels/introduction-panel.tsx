"use client";

import { DashboardEditContainer } from "@/components/feature/dashboard/dashboard-edit-container";
import EditIntroductionForm from "@/components/feature/form/dashboard/edit-form/edit-introduction-form";

export function IntroductionPanel() {
  return (
    <DashboardEditContainer title="Introduction">
      <EditIntroductionForm />
    </DashboardEditContainer>
  );
}