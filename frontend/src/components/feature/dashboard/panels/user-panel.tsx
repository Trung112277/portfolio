import { DashboardEditContainer } from "@/components/feature/dashboard/dashboard-edit-container";
import UserEdit from "../edit/user-edit/user-edit";

export default function UserPanel() {
  return (
    <DashboardEditContainer title="User">
        <UserEdit />
    </DashboardEditContainer>
  );
}