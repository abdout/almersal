'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface LoadingContextType {
  isContentLoaded: boolean;
  setContentLoaded: () => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const setContentLoaded = useCallback(() => setIsContentLoaded(true), []);

  return (
    <LoadingContext.Provider value={{ isContentLoaded, setContentLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
