"use client";

import { ReactNode } from 'react';

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  // Initialize stores with data
  
  return <>{children}</>;
}
