"use client";

import { ReactNode } from 'react';
import { useInitializeStores } from '@/hooks/useInitializeStores';

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  // Initialize stores with data
  useInitializeStores();
  
  return <>{children}</>;
}
