'use client';

import { MobileHeroSlider } from '@/components/atom/mobile-hero-slider';
import type { Dictionary } from '@/lib/i18n';

interface MobileHeroSectionProps {
  dictionary: Dictionary;
  onColorChange?: (color: string) => void;
}

export function MobileHeroSection({ dictionary, onColorChange }: MobileHeroSectionProps) {
  // Detect language based on dictionary content
  const isArabic = dictionary.hero.title === 'المرسال للإنتاج الإعلامي';

  // 7 placeholder slides with overlay colors
  const slides = [
    { id: '1', overlayColor: '#ED6C00' },  // Orange
    { id: '2', overlayColor: '#2639A6' },  // Blue
    { id: '3', overlayColor: '#CC2525' },  // Red
    { id: '4', overlayColor: '#139A39' },  // Green
    { id: '5', overlayColor: '#FFD900' },  // Yellow
    { id: '6', overlayColor: '#139A39' },  // Green (repeat)
    { id: '7', overlayColor: '#2639A6' },  // Blue (repeat)
  ];

  return (
    <div data-mobile-hero-section className="md:hidden">
      <MobileHeroSlider
        slides={slides}
        onColorChange={onColorChange}
        locale={isArabic ? 'ar' : 'en'}
        dictionary={{
          visionStatement: dictionary.hero.visionStatement,
          leftText: dictionary.hero.leftPanel,
          rightText: dictionary.hero.rightPanel,
          ctaPrimary: dictionary.menu.bookNow,
          ctaSecondary: dictionary.menu.request,
        }}
        showBadge={true}
      />
    </div>
  );
}
