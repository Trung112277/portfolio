// frontend/src/hooks/useTechStack.ts
import { useState, useEffect, useCallback } from "react";
import { TechStackService } from "@/services/tech-stack.service";
import { Database } from "@/types/database";

type TechStack = Database["public"]["Tables"]["tech_stack"]["Row"];

export function useTechStack(category?: string) {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTechStack = useCallback(async () => {
    try {
      setLoading(true);
      const data = category
        ? await TechStackService.getByCategory(category)
        : await TechStackService.getAll();
      setTechStack(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load tech stack"
      );
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadTechStack();
  }, [loadTechStack]);

  const createTech = async (
    tech: Database["public"]["Tables"]["tech_stack"]["Insert"]
  ) => {
    try {
      const newTech = await TechStackService.create(tech);
      setTechStack((prev) => [newTech, ...prev]);
      return newTech;
    } catch (err) {
      throw err;
    }
  };

  const updateTech = async (
    id: number,
    updates: Database["public"]["Tables"]["tech_stack"]["Update"]
  ) => {
    try {
      const updatedTech = await TechStackService.update(id, updates);
      setTechStack((prev) => prev.map((t) => (t.id === id ? updatedTech : t)));
      return updatedTech;
    } catch (err) {
      throw err;
    }
  };

  const deleteTech = async (id: number) => {
    try {
      await TechStackService.delete(id);
      setTechStack((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    techStack,
    loading,
    error,
    createTech,
    updateTech,
    deleteTech,
    refetch: loadTechStack,
  };
}
