"use client";
import { useGlobalRealtime } from "@/hooks/useGlobalRealtime";

export function GlobalRealtimeProvider({ children }: { children: React.ReactNode }) {
  useGlobalRealtime();
  return <>{children}</>;
}
