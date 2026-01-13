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
      subtitle: 'شركة المرسال للإنتاج الإعلامي هي شركة رائدة في مجال الإنتاج الإعلامي والتصوير الاحترافي والمحتوى الرقمي.',
      leftText: {
        main: 'الإبداع',
        sub: 'نصنعه',
      },
      rightText: {
        main: 'الهوية',
        sub: 'نبنيها',
      },
      overlayColor: 'oklch(0.65 0.2 45)',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80',
      title: 'إنتاج الأفلام',
      subtitle: 'نصنع قصصاً تلهم وتؤثر - أفلام وثائقية وإعلانات تجارية بأعلى معايير الجودة العالمية.',
      leftText: {
        main: 'القصة',
        sub: 'نرويها',
      },
      rightText: {
        main: 'الرؤية',
        sub: 'نحققها',
      },
      overlayColor: 'oklch(0.60 0.22 50)',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=1920&q=80',
      title: 'التصوير الاحترافي',
      subtitle: 'نوثق لحظاتك بإبداع - جلسات تصوير احترافية للمنتجات والفعاليات والبورتريه.',
      leftText: {
        main: 'اللحظة',
        sub: 'نوثقها',
      },
      rightText: {
        main: 'الجمال',
        sub: 'نكشفه',
      },
      overlayColor: 'oklch(0.70 0.18 40)',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1920&q=80',
      title: 'المحتوى الرقمي',
      subtitle: 'نبني حضورك الرقمي - إدارة وإنشاء محتوى مبتكر لمنصات التواصل الاجتماعي.',
      leftText: {
        main: 'الحضور',
        sub: 'نعززه',
      },
      rightText: {
        main: 'التأثير',
        sub: 'نصنعه',
      },
      overlayColor: 'oklch(0.58 0.24 55)',
    },
  ];

  return <VideoSlider slides={slides} autoPlayInterval={6000} />;
}
