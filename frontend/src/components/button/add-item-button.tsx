"use client";

import { Plus } from "lucide-react";
import PrimaryButton from "@/components/button/primary-button";

interface AddItemButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

export default function AddItemButton({
  onClick,
  label,
  className = "",
  disabled = false,
}: AddItemButtonProps) {
  return (
    <PrimaryButton
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 ${className}`}
    >
      <Plus className="h-4 w-4" />
      {label}
    </PrimaryButton>
  );
}
