import IntroductionEditForm from "../../form/dashboard/introduction-edit-form";
import { DashboardEditContainer } from "../dashboard-edit-container";

export function IntroductionPanel() {
  return (
    <DashboardEditContainer title="Introduction">
      <IntroductionEditForm />
    </DashboardEditContainer>
  );
}