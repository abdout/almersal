'use client';

import { GSAPHeroSlider } from '@/components/atom/gsap-hero-slider';
import type { Dictionary } from '@/lib/i18n';

interface HeroSectionProps {
  dictionary: Dictionary;
  onColorChange?: (color: string) => void;
}

export function HeroSection({ dictionary, onColorChange }: HeroSectionProps) {
  // Exact colors from reference site (media-arts.ac.jp)
  const slides = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80',
      title: dictionary.hero.title,
      subtitle: 'شركة المرسال للإنتاج الإعلامي هي شركة رائدة في مجال الإنتاج الإعلامي والتصوير الاحترافي والمحتوى الرقمي.',
      leftText: {
        main: 'إبداع',
        sub: 'نصنعه',
      },
      rightText: {
        main: 'هوية',
        sub: 'نبنيها',
      },
      overlayColor: '#ED6C00', // Orange (exact from reference)
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=80',
      title: 'إنتاج الأفلام',
      subtitle: 'نصنع قصصاً تلهم وتؤثر - أفلام وثائقية وإعلانات تجارية بأعلى معايير الجودة العالمية.',
      leftText: {
        main: 'قصة',
        sub: 'نرويها',
      },
      rightText: {
        main: 'رؤية',
        sub: 'نحققها',
      },
      overlayColor: '#2639A6', // Blue (exact from reference)
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=1920&q=80',
      title: 'التصوير الاحترافي',
      subtitle: 'نوثق لحظاتك بإبداع - جلسات تصوير احترافية للمنتجات والفعاليات والبورتريه.',
      leftText: {
        main: 'لحظة',
        sub: 'نوثقها',
      },
      rightText: {
        main: 'جمال',
        sub: 'نكشفه',
      },
      overlayColor: '#CC2525', // Red (exact from reference)
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80',
      title: 'المحتوى الرقمي',
      subtitle: 'نبني حضورك الرقمي - إدارة وإنشاء محتوى مبتكر لمنصات التواصل الاجتماعي.',
      leftText: {
        main: 'حضور',
        sub: 'نعززه',
      },
      rightText: {
        main: 'تأثير',
        sub: 'نصنعه',
      },
      overlayColor: '#139A39', // Green (exact from reference)
    },
    {
      id: '5',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80',
      title: 'الإعلانات المرئية',
      subtitle: 'نصمم حملات إعلانية مبتكرة تصل لجمهورك المستهدف بأسلوب إبداعي مميز.',
      leftText: {
        main: 'إعلان',
        sub: 'نبدعه',
      },
      rightText: {
        main: 'نجاح',
        sub: 'نحققه',
      },
      overlayColor: '#FFD900', // Yellow (exact from reference)
    },
  ];

  return <GSAPHeroSlider slides={slides} autoPlayInterval={6000} onColorChange={onColorChange} />;
}
