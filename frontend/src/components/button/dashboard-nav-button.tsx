"use client";

import { Button } from "../ui/button";

interface DashboardNavButtonProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  onNavigate?: (section: string) => void;
  onClick?: () => void;
}

export function DashboardNavButton({
  to,
  children,
  isActive = false,
  onNavigate,
  onClick,
}: DashboardNavButtonProps) {
  const handleClick = () => {
    if (onNavigate) {
      const section = to.split('/').pop() || 'overview';
      onNavigate(section);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`h-12 w-full flex items-center justify-center p-4 rounded-md text-xl font-bold uppercase transition-all duration-300 ${
        isActive 
          ? 'bg-primary text-primary-foreground shadow-md' 
          : 'bg-gray-900 hover:bg-primary'
      }`}
    >
      {children}
    </Button>
  );
}
