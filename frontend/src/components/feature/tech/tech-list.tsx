"use client";
import TechItem from "@/components/feature/tech/tech-item";
import TechDataLoader from "@/components/feature/tech/tech-data-loader";

export default function TechList() {
  // Define the categories we want to display
  const categories = [
    { name: "Frontend", category: "frontend" },
    { name: "Backend", category: "backend" },
    { name: "Database", category: "database" },
    { name: "DevOps", category: "devops" },
  ];

  return (
    <div className="flex flex-col gap-5 md:gap-10">
      {/* Load all tech data once */}
      <TechDataLoader />
      
      {categories.map((tech) => (
        <TechItem
          key={tech.category}
          title={tech.name}
          category={tech.category}
        />
      ))}
    </div>
  );
}
