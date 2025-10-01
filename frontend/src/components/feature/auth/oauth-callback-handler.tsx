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
        const urlParams = new URLSearchParams(window.location.search);
        const hasOAuthParams = urlParams.has('code') || urlParams.has('state') || urlParams.has('access_token');
        
        // Only process OAuth callback if we have OAuth parameters
        if (!hasOAuthParams) {
          return;
        }

        // Check if we have a session after OAuth redirect
        const sessionData = await AuthService.handleAuthCallback();
        
        if (sessionData.session) {
          // Only show toast for fresh OAuth redirects
          const hasShownOAuthToast = sessionStorage.getItem('oauth-toast-shown');
          if (!hasShownOAuthToast) {
            toast.success("Logged in successfully!");
            sessionStorage.setItem('oauth-toast-shown', 'true');
          }
          
          // Dispatch custom event to notify other components
          window.dispatchEvent(new CustomEvent('auth-changed'));
          
          // Clean up URL parameters after successful OAuth
          if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
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

    // Only run on client side and if we're on the dashboard (OAuth redirect target)
    if (typeof window !== 'undefined' && window.location.pathname === '/dashboard') {
      handleOAuthCallback();
    }
  }, [router]);

  return null; // This component doesn't render anything
}
