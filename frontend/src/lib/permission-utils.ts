import { toast } from "sonner";

/**
 * Utility functions for handling user permissions and displaying appropriate messages
 */

export interface PermissionResult {
  hasPermission: boolean;
  showToast?: boolean;
}

/**
 * Check if user has admin permission and show toast if not
 * @param isAdmin - Whether the user is an admin
 * @param action - The action being attempted (for toast message)
 * @returns PermissionResult with permission status
 */
export function checkAdminPermission(
  isAdmin: boolean, 
  action: string = "perform this action"
): PermissionResult {
  if (!isAdmin) {
    toast.error(`You do not have permission to ${action}. Only admin can perform this action.`, {
      duration: 4000,
      position: "top-center",
    });
    return { hasPermission: false, showToast: true };
  }
  
  return { hasPermission: true };
}

/**
 * Check admin permission for CRUD operations
 */
export const PermissionActions = {
  CREATE: "create",
  UPDATE: "update", 
  DELETE: "delete",
  MANAGE: "manage"
} as const;

/**
 * Wrapper function for API calls that require admin permission
 * @param isAdmin - Whether the user is an admin
 * @param action - The action being attempted
 * @param apiCall - The API function to call if permission is granted
 * @returns Promise with the result or throws error
 */
export async function withAdminPermission<T>(
  isAdmin: boolean,
  action: string,
  apiCall: () => Promise<T>
): Promise<T> {
  const permission = checkAdminPermission(isAdmin, action);
  
  if (!permission.hasPermission) {
    throw new Error(`Insufficient permissions: ${action}`);
  }
  
  return apiCall();
}

/**
 * Check if user can perform admin actions
 * @param userRole - The user's role
 * @returns boolean indicating admin status
 */
export function isAdminUser(userRole: string | null | undefined): boolean {
  return userRole === 'admin';
}
