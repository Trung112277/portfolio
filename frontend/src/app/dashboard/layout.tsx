import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/feature/sidebar/app-sidebar";

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
    <>
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
                <Link
                  href="/login"
                  className="hover:text-primary text-xl font-bold transition-colors"
                >
                  Login
                </Link>
              </nav>
            </div>
          </header>
          <main className="p-4 w-full">{children}</main>
          <Toaster />
        </div>
      </SidebarProvider>
    </>
  );
}
