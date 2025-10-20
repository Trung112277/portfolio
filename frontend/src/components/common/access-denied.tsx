"use client";

import { LockIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function AccessDenied({
  title = "Access Denied",
  message = "You don't have permission to access this section.",
  description = "Only administrators can access this feature.",
  showBackButton = true,
  onBack
}: AccessDeniedProps) {
  return (
    <div className="space-y-6">
      <div className="text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/10 rounded-full">
            <LockIcon className="h-12 w-12 text-red-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-red-400 mb-2">{title}</h2>
        <p className="text-gray-400 mb-4 max-w-md mx-auto">{message}</p>
        <p className="text-sm text-gray-500 mb-6">{description}</p>
        
        {showBackButton && (
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 mx-auto"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Go Back
          </Button>
        )}
      </div>
    </div>
  );
}
