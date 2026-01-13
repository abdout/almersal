'use client';

import { LoadingWrapper } from '@/components/template/loading-wrapper';
import { Header } from '@/components/template/header';
import { HeroSection } from '@/components/template/hero-section';
import { ServicesSection } from '@/components/template/services-section';
import { StatsSection } from '@/components/template/stats-section';
import { PortfolioSection } from '@/components/template/portfolio-section';
import { CTASection } from '@/components/template/cta-section';
import { Footer } from '@/components/template/footer';
import { BottomNav } from '@/components/template/bottom-nav';
import { ParallaxCircles } from '@/components/atom/parallax-circle';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { use } from 'react';

const dictionaryAr = {
  nav: {
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'خدماتنا',
    portfolio: 'أعمالنا',
    contact: 'تواصل معنا',
  },
  hero: {
    title: 'المرسال للإنتاج الإعلامي',
    subtitle: 'نصنع المحتوى الذي يلهم',
    cta: 'اكتشف أعمالنا',
  },
  services: {
    title: 'خدماتنا',
    subtitle: 'نقدم مجموعة متكاملة من الخدمات الإعلامية',
    video: {
      title: 'إنتاج الفيديو',
      description: 'إنتاج أفلام وثائقية وإعلانات تجارية ومحتوى رقمي بأعلى جودة',
    },
    photo: {
      title: 'التصوير الفوتوغرافي',
      description: 'جلسات تصوير احترافية للمنتجات والفعاليات والبورتريه',
    },
    design: {
      title: 'التصميم الجرافيكي',
      description: 'تصميم هويات بصرية ومواد تسويقية مبتكرة',
    },
    social: {
      title: 'إدارة وسائل التواصل',
      description: 'إدارة وإنشاء محتوى لمنصات التواصل الاجتماعي',
    },
  },
  stats: {
    projects: 'مشروع منجز',
    clients: 'عميل سعيد',
    awards: 'جائزة',
    years: 'سنوات خبرة',
  },
  portfolio: {
    title: 'أعمالنا',
    subtitle: 'نماذج من مشاريعنا المميزة',
  },
  cta: {
    title: 'هل لديك مشروع؟',
    subtitle: 'دعنا نحول فكرتك إلى واقع',
    button: 'تواصل معنا',
  },
  footer: {
    description: 'شركة المرسال للإنتاج الإعلامي - نصنع المحتوى الذي يلهم',
    quickLinks: 'روابط سريعة',
    contact: 'تواصل معنا',
    followUs: 'تابعنا',
    rights: 'جميع الحقوق محفوظة',
  },
};

const dictionaryEn = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    contact: 'Contact',
  },
  hero: {
    title: 'Almersal Media Production',
    subtitle: 'We Create Content That Inspires',
    cta: 'Explore Our Work',
  },
  services: {
    title: 'Our Services',
    subtitle: 'We offer a comprehensive range of media services',
    video: {
      title: 'Video Production',
      description: 'Documentary films, commercials, and digital content of the highest quality',
    },
    photo: {
      title: 'Photography',
      description: 'Professional photo sessions for products, events, and portraits',
    },
    design: {
      title: 'Graphic Design',
      description: 'Visual identity design and innovative marketing materials',
    },
    social: {
      title: 'Social Media Management',
      description: 'Content creation and management for social media platforms',
    },
  },
  stats: {
    projects: 'Projects Completed',
    clients: 'Happy Clients',
    awards: 'Awards Won',
    years: 'Years Experience',
  },
  portfolio: {
    title: 'Our Work',
    subtitle: 'Featured projects from our portfolio',
  },
  cta: {
    title: 'Have a Project?',
    subtitle: 'Let us turn your idea into reality',
    button: 'Contact Us',
  },
  footer: {
    description: 'Almersal Media Production - We Create Content That Inspires',
    quickLinks: 'Quick Links',
    contact: 'Contact Us',
    followUs: 'Follow Us',
    rights: 'All Rights Reserved',
  },
};

const dictionaries = {
  ar: dictionaryAr,
  en: dictionaryEn,
};

export default function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = use(params);
  const lang = (locales.includes(rawLang as Locale) ? rawLang : defaultLocale) as Locale;
  const dictionary = dictionaries[lang];

  return (
    <LoadingWrapper>
      <ParallaxCircles />

      <Header lang={lang} dictionary={dictionary} />

      <main className="relative z-10">
        <HeroSection dictionary={dictionary} />
        <ServicesSection dictionary={dictionary} />
        <StatsSection dictionary={dictionary} />
        <PortfolioSection dictionary={dictionary} />
        <CTASection lang={lang} dictionary={dictionary} />
      </main>

      <Footer lang={lang} dictionary={dictionary} />
      <BottomNav lang={lang} />

      {/* Safe area for bottom nav on mobile */}
      <div className="h-16 md:hidden" />
    </LoadingWrapper>
  );
}
