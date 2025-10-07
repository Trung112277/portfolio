
"use client";
import { useTechStack } from "@/hooks/useTechStack";
import { GlowBoxList } from "@/components/feature/glow-bow/glow-box-list";
import { BaseTechStack } from "@/types/tech-stack";

interface TechItemProps {
  title: string;
  category: string;
}

export default function TechItem({ title, category }: TechItemProps) {
  const { techStack, loading, error } = useTechStack(category.toLowerCase());

  // Don't render if loading, error, or no data
  if (loading) return null;
  if (error) return null;
  if (techStack.length === 0) return null;

  // Convert database format to BaseTechStack format
  const categoryTech: BaseTechStack[] = techStack.map((tech) => ({
    id: String(tech.id),
    name: tech.description,
    color: tech.color,
    description: tech.description,
    category: category.toLowerCase(),
    logo: tech.image_url,
  }));

  return (
    <div className="flex flex-col gap-3 text-foreground justify-center items-center">
      <h3 className="text-2xl capitalize">{title}</h3>
      <GlowBoxList techStack={categoryTech} />
    </div>
  );
}
