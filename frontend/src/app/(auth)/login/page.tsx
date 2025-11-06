"use client";

import { Metadata } from "next";
import Auth from "@/components/feature/auth/auth";
import AuthGuard from "@/components/feature/auth/auth-guard";
import Image from "next/image";
import { getAuthorNameServerSide } from "@/lib/author-name-server";
import { DynamicTitle } from "@/components/common/dynamic-title";
import { LoginPageLink } from "@/components/feature/auth/login-page-link";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const authorName = await getAuthorNameServerSide();
    
    return {
      title: `Login | ${authorName} Portfolio`,
      description: "Login to access the admin dashboard for managing portfolio content.",
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch (error) {
    console.error("Error generating login metadata:", error);
    return {
      title: "Login | Portfolio",
      description: "Login to access the admin dashboard for managing portfolio content.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default function Login() {
  return (
    <>
      <DynamicTitle title={`Login | Portfolio`} />
      <AuthGuard requireAuth={false} redirectTo="/dashboard">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/background/background-login.jpg"
            alt="Background Login"
            className="w-full h-full object-cover -z-10 brightness-50 blur-xs"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzInIGhlaWdodD0nMzInIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzMyJyBoZWlnaHQ9JzMyJyByeD0nNCcgZmlsbD0nI2ZmZicgZmlsbC1vcGFjaXR5PScwLjEnIC8+PC9zdmc+"
            width={1000}
            height={1000}
          />
        </div>
        <div className="min-h-screen flex items-center justify-center flex-col gap-4 relative z-10 p-5">
          <Auth />
          <LoginPageLink />
        </div>
      </div>
    </AuthGuard>
    </>
  );
}
