import { DashboardEditContainer } from "../dashboard-edit-container";
import EditAuthorForm from "../../form/dashboard/edit-author-form";

export function PersonalInformationPanel() {
  return (
    <DashboardEditContainer title="Personal Information">
    <EditAuthorForm />
  </DashboardEditContainer>
  );
}