'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LoadingWrapper } from '@/components/template/loading-wrapper';
import { Header } from '@/components/template/header';
import { HeroSection } from '@/components/template/hero-section';
import { PickupSection } from '@/components/template/pickup-section';
import { ServicesSection } from '@/components/template/services-section';
import { StatsSection } from '@/components/template/stats-section';
import { PortfolioSection } from '@/components/template/portfolio-section';
import { CTASection } from '@/components/template/cta-section';
import { Footer } from '@/components/template/footer';
import { BottomNav } from '@/components/template/bottom-nav';
import { ParallaxCircles } from '@/components/atom/parallax-circle';
import { ParallaxSection } from '@/components/template/parallax-section';
import { PhotoGridSection } from '@/components/template/photo-grid-section';
import type { Locale, Dictionary } from '@/lib/i18n';

interface HomeContentProps {
  dictionary: Dictionary;
  params: { lang: Locale };
}

export function HomeContent({ dictionary, params }: HomeContentProps) {
  const { lang } = params;
  const [currentColor, setCurrentColor] = useState('#e07830');

  const handleColorChange = useCallback((color: string) => {
    setCurrentColor(color);
  }, []);

  return (
    <LoadingWrapper>
      <ParallaxCircles />

      <Header lang={lang} dictionary={dictionary} />

      <main className="relative">
        {/* Unified Colored Section - Hero + Pickup */}
        <motion.div
          className="relative z-20 rounded-b-[80px] md:rounded-b-[120px] overflow-hidden shadow-2xl"
          animate={{ backgroundColor: currentColor }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <HeroSection dictionary={dictionary} onColorChange={handleColorChange} />
          <PickupSection />
        </motion.div>

        {/* Photo Grid Section - Right after colored section */}
        <div className="relative z-10 -mt-10 md:-mt-16">
          <PhotoGridSection />
        </div>

        {/* Sections that appear from behind with parallax */}
        <div className="relative z-10 bg-background">
          <ParallaxSection offset={80}>
            <ServicesSection dictionary={dictionary} />
          </ParallaxSection>

          <ParallaxSection offset={60}>
            <StatsSection dictionary={dictionary} />
          </ParallaxSection>

          <ParallaxSection offset={40}>
            <PortfolioSection dictionary={dictionary} />
          </ParallaxSection>

          <ParallaxSection offset={20}>
            <CTASection lang={lang} dictionary={dictionary} />
          </ParallaxSection>
        </div>
      </main>

      <Footer lang={lang} dictionary={dictionary} />
      <BottomNav lang={lang} />

      {/* Safe area for bottom nav on mobile */}
      <div className="h-16 md:hidden" />
    </LoadingWrapper>
  );
}
