"use client";
import { useTechDbStore } from "@/stores/tech-db-store";
import { GlowBoxList } from "@/components/feature/glow-bow/glow-box-list";
import { BaseTechStack } from "@/types/tech-stack";
import { useEffect, useState } from "react";
import { TechStackService } from "@/services/tech-stack.service";

interface TechItemProps {
  title: string;
  category: string;
}

export default function TechItem({ title, category }: TechItemProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    frontendTech, 
    backendTech, 
    databaseTech, 
    devopsTech,
    setTechByCategory
  } = useTechDbStore();

  // Get tech stack based on category
  const techStack = category === 'frontend' ? frontendTech :
                   category === 'backend' ? backendTech :
                   category === 'database' ? databaseTech :
                   category === 'devops' ? devopsTech : [];

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if we already have data in store
        if (techStack.length > 0) {
          setLoading(false);
          return;
        }
        
        // Load data from database
        const data = await TechStackService.getByCategory(category);
        setTechByCategory(category, data);
        setLoading(false);
      } catch (err) {
        console.error(`Error loading ${category} tech:`, err);
        setError(err instanceof Error ? err.message : 'Failed to load tech stack');
        setLoading(false);
      }
    };
    
    loadData();
  }, [category, techStack.length, setTechByCategory]);

  // Set loading to false when we have data
  useEffect(() => {
    if (techStack.length > 0) {
      setLoading(false);
      setError(null);
    }
  }, [techStack.length]);

  // Realtime is now handled globally by GlobalRealtimeProvider

  // Don't render if loading, error, or no data
  if (loading)
    return (
      <div className="flex flex-col gap-3 text-foreground justify-center items-center">
        Loading {category.toLowerCase()}...
      </div>
    );
  if (error) return (
      <div className="flex flex-col gap-3 text-foreground justify-center items-center">
        Error loading {category.toLowerCase()}...
      </div>
    );
  if (techStack.length === 0) return null;

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
      <h3 className="text-2xl capitalize">{title}</h3>
      <GlowBoxList techStack={categoryTech} />
    </div>
  );
}
