"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";

export default function OAuthCallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Check if this is a fresh OAuth redirect by looking for OAuth parameters
        // Check both query params (?code=...) and hash fragments (#access_token=...)
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        const hasQueryParams = urlParams.has('code') || urlParams.has('state') || urlParams.has('access_token');
        const hasHashParams = hashParams.has('access_token') || hashParams.has('code') || hashParams.has('state');
        const hasOAuthParams = hasQueryParams || hasHashParams;
        
        // Only process OAuth callback if we have OAuth parameters
        if (!hasOAuthParams) {
          return;
        }

        // Check if we have a session after OAuth redirect
        const sessionData = await AuthService.handleAuthCallback();
        
        if (sessionData.session) {
          // OAuth login mặc định có Remember me
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', sessionData.session.user?.email || '');
          sessionStorage.removeItem('supabase-temporary-session');
          
          // Only show toast for fresh OAuth redirects
          const hasShownOAuthToast = sessionStorage.getItem('oauth-toast-shown');
          if (!hasShownOAuthToast) {
            toast.success("Logged in successfully!");
            sessionStorage.setItem('oauth-toast-shown', 'true');
          }
          
          // Dispatch custom event to notify other components
          window.dispatchEvent(new CustomEvent('auth-changed'));
          
          // Clean up URL - remove both query params and hash fragments
          if (window.history.replaceState) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
          
          // Redirect to dashboard if not already there
          if (window.location.pathname !== '/dashboard') {
            router.push('/dashboard');
          }
        } else {
          // No session found, user might not be authenticated
          console.log("No active session found");
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        // Don't show error toast for session missing - it's normal when not logged in
        if (error instanceof Error && !error.message.includes('Auth session missing')) {
          toast.error("Authentication failed");
        }
      }
    };

    // Run on client side - check for OAuth params on any page
    if (typeof window !== 'undefined') {
      handleOAuthCallback();
    }
  }, [router]);

  return null; // This component doesn't render anything
}
