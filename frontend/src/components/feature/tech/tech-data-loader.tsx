"use client";
import { useTechStack } from "@/hooks/useTechStack";

export default function TechDataLoader() {
  // Load all tech data once when this component mounts
  useTechStack(); // Call without category to load all data

  // This component does not render any UI, it only handles data loading
  return null;
}
