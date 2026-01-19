'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

const DEFAULT_COLOR = '#ED6C00';

interface HeroColorContextType {
  heroColor: string;
  setHeroColor: (color: string) => void;
  isPastHeroSection: boolean;
  setIsPastHeroSection: (value: boolean) => void;
}

const HeroColorContext = createContext<HeroColorContextType | null>(null);

export function HeroColorProvider({ children }: { children: ReactNode }) {
  const [heroColor, setHeroColorState] = useState(DEFAULT_COLOR);
  const [isPastHeroSection, setIsPastHeroSectionState] = useState(false);

  const setHeroColor = useCallback((color: string) => {
    setHeroColorState(color);
  }, []);

  const setIsPastHeroSection = useCallback((value: boolean) => {
    setIsPastHeroSectionState(value);
  }, []);

  return (
    <HeroColorContext.Provider value={{ heroColor, setHeroColor, isPastHeroSection, setIsPastHeroSection }}>
      {children}
    </HeroColorContext.Provider>
  );
}

export function useHeroColor() {
  const context = useContext(HeroColorContext);
  if (!context) {
    return { heroColor: DEFAULT_COLOR, setHeroColor: () => {}, isPastHeroSection: false, setIsPastHeroSection: () => {} };
  }
  return context;
}
