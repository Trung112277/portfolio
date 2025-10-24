"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { checkAdminPermission, PermissionActions } from "@/lib/permission-utils";
import { toast } from "sonner";
import PrimaryButton from "@/components/button/primary-button";

export default function PermissionDemo() {
  const { isAdmin, userRole, loading } = useUserRole();

  const handleTestPermission = (action: string) => {
    const permission = checkAdminPermission(isAdmin, action);
    if (permission.hasPermission) {
      toast.success(`Bạn có quyền ${action}!`);
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg">
        <div className="animate-pulse">Loading user role...</div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Permission Demo</h3>
      
      <div className="space-y-2">
        <p><strong>Current Role:</strong> {userRole || 'Not logged in'}</p>
        <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Test Actions:</h4>
        <div className="flex gap-2 flex-wrap">
          <PrimaryButton 
            onClick={() => handleTestPermission(PermissionActions.CREATE)}
            className="text-sm"
          >
            Test Create
          </PrimaryButton>
          <PrimaryButton 
            onClick={() => handleTestPermission(PermissionActions.UPDATE)}
            className="text-sm"
          >
            Test Update
          </PrimaryButton>
          <PrimaryButton 
            onClick={() => handleTestPermission(PermissionActions.DELETE)}
            className="text-sm"
          >
            Test Delete
          </PrimaryButton>
          <PrimaryButton 
            onClick={() => handleTestPermission(PermissionActions.MANAGE)}
            className="text-sm"
          >
            Test Manage
          </PrimaryButton>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>• Admin users: All buttons work and show success toast</p>
        <p>• Regular users: All buttons show permission denied toast</p>
      </div>
    </div>
  );
}
