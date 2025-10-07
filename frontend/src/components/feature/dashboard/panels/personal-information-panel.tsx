"use client";

import { DashboardEditContainer } from "@/components/feature/dashboard/dashboard-edit-container";
import EditAuthorForm from "@/components/feature/form/dashboard/edit-form/edit-author-form";

export function PersonalInformationPanel() {
  return (
    <DashboardEditContainer title="Author Name">
      <EditAuthorForm />
    </DashboardEditContainer>
  );
}
