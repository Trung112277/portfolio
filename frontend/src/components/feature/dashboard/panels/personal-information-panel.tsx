import AuthorEditForm from "../../form/dashboard/author-edit-form";
import { DashboardEditContainer } from "../dashboard-edit-container";

export function PersonalInformationPanel() {
  return (
    <DashboardEditContainer title="Personal Information">
    <AuthorEditForm />
  </DashboardEditContainer>
  );
}