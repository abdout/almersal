'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LoadingWrapper } from '@/components/template/loading-wrapper';
import { useHeroColor } from '@/components/template/hero-color-context';
import { Header } from '@/components/template/header';
import { HeroSection } from '@/components/template/hero-section';
import { MobileHeroSection } from '@/components/template/mobile-hero-section';
import { PickupSection } from '@/components/template/pickup-section';
import { DreamSection } from '@/components/template/dream-section';
import { MobileDreamSection } from '@/components/atom/mobile-dream-section';
import { SupportSection } from '@/components/template/support-section';
import { VisitorSection } from '@/components/template/visitor-section';
import { MovieSection } from '@/components/template/movie-section';
import { MobileMovieSection } from '@/components/template/mobile-movie-section';
import { InfoCardsSection } from '@/components/template/info-cards-section';
import { InterviewSection } from '@/components/template/interview-section';
import { TopicsSection } from '@/components/template/topics-section';
import { Footer } from '@/components/template/footer';
import { ParallaxSection } from '@/components/template/parallax-section';
import { PhotoGridSection } from '@/components/template/photo-grid-section';
import { SectionObserverProvider } from '@/components/template/section-observer-provider';
import { MobileBottomBar } from '@/components/atom/mobile-bottom-bar';
import type { Locale, Dictionary } from '@/lib/i18n';

const MAIN_ORANGE = '#ED6C00';

interface HomeContentProps {
  dictionary: Dictionary;
  params: { lang: Locale };
}

// Inner component that uses the hero color context (must be inside HeroColorProvider)
function HomeContentInner({ dictionary, lang }: { dictionary: Dictionary; lang: Locale }) {
  const { heroColor, setHeroColor, setIsPastHeroSection } = useHeroColor();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroPickupWrapperRef = useRef<HTMLDivElement>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  // Track when hero section is completely out of view
  useEffect(() => {
    const checkHeroVisibility = () => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      // Hero is out of view when its bottom is above the viewport top
      const heroOutOfView = rect.bottom < 0;

      setIsHeroInView(!heroOutOfView);
    };

    window.addEventListener('scroll', checkHeroVisibility, { passive: true });
    checkHeroVisibility(); // Initial check

    return () => window.removeEventListener('scroll', checkHeroVisibility);
  }, []);

  // Track when the entire hero+pickup wrapper is out of view
  useEffect(() => {
    const checkWrapperVisibility = () => {
      if (!heroPickupWrapperRef.current) return;

      const rect = heroPickupWrapperRef.current.getBoundingClientRect();
      // Wrapper is out of view when its bottom is above the viewport top
      const wrapperOutOfView = rect.bottom < 0;

      setIsPastHeroSection(wrapperOutOfView);
    };

    window.addEventListener('scroll', checkWrapperVisibility, { passive: true });
    checkWrapperVisibility(); // Initial check

    return () => window.removeEventListener('scroll', checkWrapperVisibility);
  }, [setIsPastHeroSection]);

  // When hero goes out of view, transition to main orange
  useEffect(() => {
    if (!isHeroInView) {
      setHeroColor(MAIN_ORANGE);
    }
  }, [isHeroInView, setHeroColor]);

  // Only allow color changes when hero is in view
  const handleColorChange = useCallback((color: string) => {
    if (isHeroInView) {
      setHeroColor(color);
    }
  }, [isHeroInView, setHeroColor]);

  return (
    <SectionObserverProvider>
      <Header lang={lang} dictionary={dictionary} />
      <MobileBottomBar />

      <main className="relative">
        {/* Unified Colored Section - Hero + Pickup */}
        <motion.div
          ref={heroPickupWrapperRef}
          data-section-id="hero-pickup"
          data-section-type="colored"
          className="relative z-20 rounded-b-[40px] md:rounded-b-[80px] lg:rounded-b-[120px] overflow-hidden shadow-2xl"
          animate={{ backgroundColor: heroColor }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div ref={heroRef}>
            {/* Desktop Hero */}
            <HeroSection dictionary={dictionary} onColorChange={handleColorChange} />
            {/* Mobile Hero - completely separate component */}
            <MobileHeroSection dictionary={dictionary} onColorChange={handleColorChange} />
          </div>
          <PickupSection dictionary={dictionary.pickup} onColorChange={handleColorChange} />
        </motion.div>

        {/* Photo Grid Section - Positioned behind hero+pickup, reveals on scroll */}
        <div
          data-section-id="photo-grid"
          data-section-type="white"
          className="relative z-0 -mt-[50vh] md:-mt-[75vh]"
        >
          <PhotoGridSection />
        </div>

        {/* Desktop Dream Section - outside overflow-hidden container for sticky to work */}
        <div className="hidden md:block relative z-20 bg-background">
          <DreamSection dictionary={dictionary} />
        </div>

        {/* Dream (mobile) + Support + Visitor (white, rounded bottom, on top) */}
        <div
          data-section-id="white-sections"
          data-section-type="white"
          className="relative z-20 bg-background rounded-b-[40px] md:rounded-b-[80px] lg:rounded-b-[120px] overflow-hidden shadow-2xl"
        >
          {/* Mobile Dream Section - with parallax */}
          <ParallaxSection offset={80}>
            <div className="md:hidden">
              <MobileDreamSection dictionary={dictionary} />
            </div>
          </ParallaxSection>

          <ParallaxSection offset={50}>
            <SupportSection lang={lang} dictionary={dictionary} />
          </ParallaxSection>

          {/* Separator line */}
          <div className="w-full h-px bg-black" />

          <ParallaxSection offset={40}>
            <VisitorSection lang={lang} dictionary={dictionary} />
          </ParallaxSection>
        </div>

        {/* Orange sections - positioned behind white sections, reveals on scroll */}
        <div
          data-section-id="orange-sections"
          data-section-type="colored"
          className="relative z-10 -mt-[50vh] md:-mt-[80vh]"
        >
          <div className="bg-[#ED6C00] pt-[50vh] md:pt-[80vh]">
            {/* Desktop Movie */}
            <div className="hidden md:block">
              <MovieSection dictionary={dictionary} lang={lang} />
            </div>
            {/* Mobile Movie - wider sliders */}
            <MobileMovieSection dictionary={dictionary} lang={lang} />
            <TopicsSection lang={lang} dictionary={dictionary} />
            <InterviewSection lang={lang} dictionary={dictionary} />
            <InfoCardsSection dictionary={dictionary} />
          </div>
        </div>
      </main>

      <Footer lang={lang} dictionary={dictionary} />
    </SectionObserverProvider>
  );
}

export function HomeContent({ dictionary, params }: HomeContentProps) {
  const { lang } = params;

  return (
    <LoadingWrapper>
      <HomeContentInner dictionary={dictionary} lang={lang} />
    </LoadingWrapper>
  );
}
