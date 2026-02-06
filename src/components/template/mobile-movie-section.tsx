'use client';

import { FramerHeroSlider } from '@/components/atom/framer-hero-slider';
import type { Dictionary, Locale } from '@/lib/i18n';

interface MobileMovieSectionProps {
  dictionary: Dictionary;
  lang: Locale;
}

export function MobileMovieSection({ dictionary, lang }: MobileMovieSectionProps) {
  const isArabic = lang === 'ar';

  const slides = [
    { id: '1', overlayColor: '#ED6C00' },
    { id: '2', overlayColor: '#ED6C00' },
    { id: '3', overlayColor: '#ED6C00' },
    { id: '4', overlayColor: '#ED6C00' },
    { id: '5', overlayColor: '#ED6C00' },
    { id: '6', overlayColor: '#ED6C00' },
    { id: '7', overlayColor: '#ED6C00' },
  ];

  return (
    <section className="relative w-full h-screen bg-[#ED6C00] md:hidden">
      <FramerHeroSlider
        slides={slides}
        autoPlayInterval={6000}
        locale={isArabic ? 'ar' : 'en'}
        dictionary={{
          visionStatement: dictionary.hero.visionStatement,
          leftPanel: dictionary.hero.leftPanel,
          rightPanel: dictionary.hero.rightPanel,
          comingSoon: dictionary.hero.comingSoon,
          scrollDown: dictionary.hero.scrollDown,
        }}
        scaleMin={0.7}
        scaleMax={1.1}
        heightScaleMax={1.15}
        showBadge={false}
        showCustomCursor={false}
        showScrollDown={false}
        showNavArrows={true}
        showPanels={false}
        topLeftText="MOVIE"
        bottomRightText={["FROM", "MEDIA ARTS"]}
        mobileSlideWidth={270}
        mobileSlideGap={32}
        mobileBaseHeight={450}
      />
    </section>
  );
}
