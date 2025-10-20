"use client";

import Link from "next/link";
import { usePageLoader } from "@/hooks/usePageLoader";

export function LoginPageLink() {
  const { startLoading } = usePageLoader();

  return (
    <Link
      href="/"
      className="text-xl font-bold text-white border bg-primary border-primary rounded-md p-2 hover:bg-primary/80 hover:border-primary/80 transition-colors"
      onClick={() => startLoading('/')}
    >
      Go Back to Home
    </Link>
  );
}
