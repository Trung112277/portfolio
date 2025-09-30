"use client";
import { memo } from "react";
import { LinkingFloatingList, type FloatingItem } from "./linking-floating-list";
import { useProjects } from "@/hooks/useProjects";
import { PROJECT_POSITIONS } from "@/types/project";
import { ResponsivePosition } from "@/lib/position-utils";

export default memo(function ProjectsFloatingList() {
  const { projects, loading, error } = useProjects();

  if (loading) return null; 
  if (error) return null;  

  const items: FloatingItem[] = projects.map((p) => ({
    id: String(p.id),
    name: (p as unknown as { name: string }).name, 
    description: (p as unknown as { description: string }).description,
    link: (p as unknown as { link: string }).link,
    color: (p as unknown as { color: string }).color,
    position: (p as unknown as { position: ResponsivePosition }).position,
    isActive: (p as unknown as { isActive: boolean }).isActive ?? true,
  }));

  return <LinkingFloatingList items={items} positions={PROJECT_POSITIONS} />;
});