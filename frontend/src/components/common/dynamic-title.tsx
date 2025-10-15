"use client";

import { useTitle } from "@/hooks/useTitle";

interface DynamicTitleProps {
  title: string;
}

export function DynamicTitle({ title }: DynamicTitleProps) {
  useTitle(title);
  return null;
}
