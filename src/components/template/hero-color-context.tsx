'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

const DEFAULT_COLOR = '#ED6C00';

interface HeroColorContextType {
  heroColor: string;
  setHeroColor: (color: string) => void;
}

const HeroColorContext = createContext<HeroColorContextType | null>(null);

export function HeroColorProvider({ children }: { children: ReactNode }) {
  const [heroColor, setHeroColorState] = useState(DEFAULT_COLOR);

  const setHeroColor = useCallback((color: string) => {
    setHeroColorState(color);
  }, []);

  return (
    <HeroColorContext.Provider value={{ heroColor, setHeroColor }}>
      {children}
    </HeroColorContext.Provider>
  );
}

export function useHeroColor() {
  const context = useContext(HeroColorContext);
  if (!context) {
    return { heroColor: DEFAULT_COLOR, setHeroColor: () => {} };
  }
  return context;
}
