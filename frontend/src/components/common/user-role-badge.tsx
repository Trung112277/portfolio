"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { Badge } from "@/components/ui/badge";
import { CrownIcon, UserIcon, Loader2 } from "lucide-react";

export function UserRoleBadge() {
  const { userRole, loading } = useUserRole();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    );
  }

  if (!userRole) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <UserIcon className="h-3 w-3" />
        No Role
      </Badge>
    );
  }

  return (
    <Badge 
      variant={userRole === 'admin' ? 'default' : 'secondary'}
      className={`flex items-center gap-1 ${
        userRole === 'admin' 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
          : 'bg-gray-600 text-gray-200'
      }`}
    >
      {userRole === 'admin' ? (
        <CrownIcon className="h-3 w-3" />
      ) : (
        <UserIcon className="h-3 w-3" />
      )}
      {userRole === 'admin' ? 'Admin' : 'User'}
    </Badge>
  );
}
