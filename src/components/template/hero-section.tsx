'use client';

import { VideoSlider } from '@/components/atom/video-slider';

interface HeroSectionProps {
  dictionary: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
  };
}

export function HeroSection({ dictionary }: HeroSectionProps) {
  const slides = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80',
      title: dictionary.hero.title,
      subtitle: dictionary.hero.subtitle,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80',
      title: 'إنتاج الأفلام',
      subtitle: 'نصنع قصصاً تلهم وتؤثر',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=1920&q=80',
      title: 'التصوير الاحترافي',
      subtitle: 'نوثق لحظاتك بإبداع',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1920&q=80',
      title: 'المحتوى الرقمي',
      subtitle: 'نبني حضورك الرقمي',
    },
  ];

  return <VideoSlider slides={slides} autoPlayInterval={6000} />;
}
