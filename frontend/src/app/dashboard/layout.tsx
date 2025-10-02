import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/feature/sidebar/app-sidebar";
import AuthButton from "@/components/feature/auth/auth-button";
import OAuthCallbackHandler from "@/components/feature/auth/oauth-callback-handler";
import AuthGuard from "@/components/feature/auth/auth-guard";
import SessionManager from "@/components/feature/auth/session-manager";
export const metadata: Metadata = {
  title: "Dashboard | Nhat Trung Portfolio",
  description: "Dashboard for managing portfolio content and analytics",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true} redirectTo="/login">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full min-h-screen bg-gray-900">
          <header className="flex items-center justify-between bg-background gap-4 w-full h-16 border-b border-border p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <Link
                href="/"
                className="hover:text-primary text-xl font-bold flex items-center gap-2 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Go Back to Home
              </Link>
            </div>
            <div>
              <nav className="flex items-center gap-4">
                <AuthButton />
              </nav>
            </div>
          </header>
          <main className="p-4 w-full">
            <SessionManager />
            <OAuthCallbackHandler />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
