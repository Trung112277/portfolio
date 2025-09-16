import { WorkExperienceEditItem } from "@/components/feature/dashboard/edit/work-experience-edit/work-experience-edit-item";

export function WorkExperienceEditList() {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
      <WorkExperienceEditItem />
      <WorkExperienceEditItem />
    </div>
  );
}
