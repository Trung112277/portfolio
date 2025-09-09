import TechItem from "@/components/feature/tech/tech-item";

export default function TechList() {
  return <div className="flex flex-col gap-5 md:gap-10">
    <TechItem title="frontend" />
    <TechItem title="backend" />
    <TechItem title="database" />
    <TechItem title="devops" />
  </div>;
}