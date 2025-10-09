"use client";
import { useTechDbStore } from "@/stores/tech-db-store";
import { GlowBoxList } from "@/components/feature/glow-bow/glow-box-list";
import { BaseTechStack } from "@/types/tech-stack";

interface TechItemProps {
  title: string;
  category: string;
}

export default function TechItem({ title, category }: TechItemProps) {
  const { 
    frontendTech, 
    backendTech, 
    databaseTech, 
    devopsTech,
    loading,
    error
  } = useTechDbStore();

  // Get tech stack based on category
  const techStack = category === 'frontend' ? frontendTech :
                   category === 'backend' ? backendTech :
                   category === 'database' ? databaseTech :
                   category === 'devops' ? devopsTech : [];

  // Don't render if loading or error
  if (loading)
    return (
      <div className="flex flex-col gap-3 text-foreground justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <div>Loading {category.toLowerCase()}...</div>
      </div>
    );
  if (error) return (
    <div className="flex flex-col gap-3 text-foreground justify-center items-center">
      <div className="text-red-500">Error loading {category.toLowerCase()}...</div>
      <div className="text-sm text-gray-500">{error}</div>
    </div>
  );
  
  // Show empty state if no data
  if (techStack.length === 0) {
    return null;
  }

  // Convert database format to BaseTechStack format
  const categoryTech: BaseTechStack[] = techStack.map((tech) => ({
    id: String(tech.id),
    name: tech.name,
    color: tech.color,
    description: tech.name,
    category: category.toLowerCase(),
    logo: tech.image_url,
  }));

  return (
    <div className="flex flex-col gap-3 text-foreground justify-center items-center">
      <h3 className="text-2xl font-bold text-primary uppercase">{title}</h3>
      <GlowBoxList techStack={categoryTech} />
    </div>
  );
}
