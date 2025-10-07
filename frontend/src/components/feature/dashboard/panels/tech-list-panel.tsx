"use client";

import { DashboardEditContainer } from "../dashboard-edit-container";
import TechListAddForm from "../../form/dashboard/add-form/tech-list-form";
import TechListEdit from "../edit/tech-list-edit/tech-list-edit";

export function TechListPanel() {
  return (
    <DashboardEditContainer title="Tech List">
      <div className="flex flex-col gap-4">
        <TechListAddForm />
        <TechListEdit category="Frontend" />
        <TechListEdit category="Backend" />
        <TechListEdit category="Database" />
        <TechListEdit category="DevOps" />
      </div>
    </DashboardEditContainer>
  );
}
