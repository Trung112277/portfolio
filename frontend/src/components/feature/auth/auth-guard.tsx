"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export default function AuthGuard({ 
  children, 
  redirectTo = "/dashboard", 
  requireAuth = false 
}: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AuthService.getUser();
        const authenticated = !!user;
        setIsAuthenticated(authenticated);

        // If user is authenticated and we're on login page, redirect to dashboard
        if (authenticated && requireAuth === false && window.location.pathname === '/login') {
          router.push(redirectTo);
          return;
        }

        // If user is not authenticated and we require auth, redirect to login
        if (!authenticated && requireAuth === true) {
          router.push('/login');
          return;
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        
        // If we require auth but user is not authenticated, redirect to login
        if (requireAuth === true) {
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, [router, redirectTo, requireAuth]);

  // If user is authenticated and we're on login page, don't render children
  if (isAuthenticated && requireAuth === false && window.location.pathname === '/login') {
    return null;
  }

  // If user is not authenticated and we require auth, don't render children
  if (!isAuthenticated && requireAuth === true) {
    return null;
  }

  return <>{children}</>;
}
