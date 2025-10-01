"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";
import AvatarUser from "./avatar-user";

export default function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const user = await AuthService.getUser();
      setIsAuthenticated(!!user);
    } catch (error: unknown) {
      console.error('Auth check error:', error);
      // If it's a refresh token error, try to refresh the session
      if (error instanceof Error && error.message.includes('Invalid Refresh Token')) {
        try {
          await AuthService.refreshSession();
          const user = await AuthService.getUser();
          setIsAuthenticated(!!user);
        } catch (refreshError) {
          console.error('Refresh session failed:', refreshError);
          setIsAuthenticated(false);
        }
      } else {
        // For other errors (including session missing), treat as not authenticated
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Listen for auth state changes
    const handleAuthChange = () => {
      checkAuth();
    };

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', handleAuthChange);
    
    // Listen for custom auth events
    window.addEventListener('auth-changed', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
    );
  }

  if (isAuthenticated) {
    return <AvatarUser />;
  }

  return (
    <Link
      href="/login"
      className="hover:text-primary text-xl font-bold transition-colors"
    >
      Login
    </Link>
  );
}
