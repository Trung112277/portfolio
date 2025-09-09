"use client";

import { Plus } from "lucide-react";
import PrimaryButton from "@/components/button/primary-button";

interface AddItemButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export default function AddItemButton({
  onClick,
  label,
  className = "",
}: AddItemButtonProps) {
  return (
    <PrimaryButton
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <Plus className="h-4 w-4" />
      {label}
    </PrimaryButton>
  );
}
