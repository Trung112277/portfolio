"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PrimaryButton from "@/components/button/primary-button";
import { AuthService } from "@/services/auth.service";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AvatarUser() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await AuthService.signOut();
      toast.success("Logged out successfully");
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('auth-changed'));
      
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 bg-background/90">
        <PrimaryButton 
          className="w-full text-lg font-bold" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </PrimaryButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
