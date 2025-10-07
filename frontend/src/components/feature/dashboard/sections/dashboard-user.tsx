"use client";

import { DashboardTitle } from "@/components/heading/dashboar-title";
import UserPanel from "@/components/feature/dashboard/panels/user-panel";

export function DashboardUser() {
  return (
    <div className="space-y-6">
    <DashboardTitle title="User Management" description="Manage user information and settings." />

    <UserPanel />
  </div>
  )
}