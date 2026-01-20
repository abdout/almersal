'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

const DEFAULT_COLOR = '#ED6C00';

export type SectionType = 'colored' | 'white' | 'footer';

interface HeroColorContextType {
  heroColor: string;
  setHeroColor: (color: string) => void;
  isPastHeroSection: boolean;
  setIsPastHeroSection: (value: boolean) => void;
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  isFooterVisible: boolean;
  setIsFooterVisible: (value: boolean) => void;
}

const HeroColorContext = createContext<HeroColorContextType | null>(null);

export function HeroColorProvider({ children }: { children: ReactNode }) {
  const [heroColor, setHeroColorState] = useState(DEFAULT_COLOR);
  const [isPastHeroSection, setIsPastHeroSectionState] = useState(false);
  const [currentSection, setCurrentSectionState] = useState<SectionType>('colored');
  const [isFooterVisible, setIsFooterVisibleState] = useState(false);

  const setHeroColor = useCallback((color: string) => {
    setHeroColorState(color);
  }, []);

  const setIsPastHeroSection = useCallback((value: boolean) => {
    setIsPastHeroSectionState(value);
  }, []);

  const setCurrentSection = useCallback((section: SectionType) => {
    setCurrentSectionState(section);
  }, []);

  const setIsFooterVisible = useCallback((value: boolean) => {
    setIsFooterVisibleState(value);
  }, []);

  return (
    <HeroColorContext.Provider value={{
      heroColor,
      setHeroColor,
      isPastHeroSection,
      setIsPastHeroSection,
      currentSection,
      setCurrentSection,
      isFooterVisible,
      setIsFooterVisible
    }}>
      {children}
    </HeroColorContext.Provider>
  );
}

export function useHeroColor() {
  const context = useContext(HeroColorContext);
  if (!context) {
    return {
      heroColor: DEFAULT_COLOR,
      setHeroColor: () => {},
      isPastHeroSection: false,
      setIsPastHeroSection: () => {},
      currentSection: 'colored' as SectionType,
      setCurrentSection: () => {},
      isFooterVisible: false,
      setIsFooterVisible: () => {}
    };
  }
  return context;
}
