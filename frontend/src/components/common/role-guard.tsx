"use client";

import { ReactNode } from 'react';
import { useUserRole } from '@/hooks/useUserRole';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: ('admin' | 'user')[];
  fallback?: ReactNode;
  loading?: ReactNode;
}

export function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback = null, 
  loading = <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
}: RoleGuardProps) {
  const { userRole, loading: roleLoading } = useUserRole();

  if (roleLoading) {
    return <>{loading}</>;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Convenience components
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function UserOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['user']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export function AllUsers({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin', 'user']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
