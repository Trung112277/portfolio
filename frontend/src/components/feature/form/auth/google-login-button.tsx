"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      
      // Clear any previous OAuth toast flag
      sessionStorage.removeItem('oauth-toast-shown');
      
      await AuthService.signInWithGoogle();
      
      // Note: OAuth will redirect to provider, so we don't need to dispatch event here
      // The event will be handled when user returns from OAuth provider
      toast.success("Redirecting to Google...");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to login with Google");
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="bg-white text-black border-black brightness-80 hover:brightness-100 h-10"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <Image
          src="/logo/google-logo.png"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2"
        />
      )}
      {isLoading ? "Signing in..." : "Login with Google"}
    </Button>
  );
}
