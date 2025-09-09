import TechItem from "@/components/feature/tech/tech-item";
import { TECH_LIST } from "@/constant/tech-list";

export default function TechList() {
  const techList = TECH_LIST;
  return (
    <div className="flex flex-col gap-5 md:gap-10">
      {techList.map((tech) => (
        <TechItem key={tech.name} title={tech.name} category={tech.category} />
      ))}
    </div>
  );
}
