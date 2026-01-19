'use client';

import { FramerHeroSlider } from '@/components/atom/framer-hero-slider';
import type { Dictionary } from '@/lib/i18n';

interface HeroSectionProps {
  dictionary: Dictionary;
  onColorChange?: (color: string) => void;
}

export function HeroSection({ dictionary, onColorChange }: HeroSectionProps) {
  // Detect language based on dictionary content
  const isArabic = dictionary.hero.title === 'المرسال للإنتاج الإعلامي';

  // 7 placeholder slides with overlay colors
  const slides = [
    { id: '1', overlayColor: '#ED6C00' },
    { id: '2', overlayColor: '#2639A6' },
    { id: '3', overlayColor: '#CC2525' },
    { id: '4', overlayColor: '#139A39' },
    { id: '5', overlayColor: '#FFD900' },
    { id: '6', overlayColor: '#8B5CF6' },
    { id: '7', overlayColor: '#0891B2' },
  ];

  return (
    <div data-hero-section>
      <FramerHeroSlider
        slides={slides}
        autoPlayInterval={6000}
        onColorChange={onColorChange}
        locale={isArabic ? 'ar' : 'en'}
        dictionary={{
          visionStatement: dictionary.hero.visionStatement,
          leftPanel: dictionary.hero.leftPanel,
          rightPanel: dictionary.hero.rightPanel,
          comingSoon: dictionary.hero.comingSoon,
          scrollDown: dictionary.hero.scrollDown,
        }}
      />
    </div>
  );
}
