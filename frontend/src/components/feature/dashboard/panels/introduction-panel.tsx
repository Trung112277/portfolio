import { DashboardEditContainer } from "../dashboard-edit-container";
import EditIntroductionForm from "../../form/dashboard/edit-introduction-form";

export function IntroductionPanel() {
  return (
    <DashboardEditContainer title="Introduction">
      <EditIntroductionForm />
    </DashboardEditContainer>
  );
}