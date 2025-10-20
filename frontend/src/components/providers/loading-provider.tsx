"use client";

import { PageLoader } from "@/components/feature/loading/page-loader";
import { usePageLoader, useNavigationLoader } from "@/hooks/usePageLoader";

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const { isLoading, isInitialLoad } = usePageLoader();
  
  // Initialize navigation loader để detect page changes
  useNavigationLoader();

  return (
    <>
      {children}
      <PageLoader isLoading={isLoading} isInitialLoad={isInitialLoad} />
    </>
  );
}
