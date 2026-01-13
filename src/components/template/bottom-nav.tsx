'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Info, Briefcase, Image, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';

interface BottomNavProps {
  lang: Locale;
}

export function BottomNav({ lang }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: `/${lang}`, icon: Home, label: lang === 'ar' ? 'الرئيسية' : 'Home' },
    { href: `/${lang}/about`, icon: Info, label: lang === 'ar' ? 'من نحن' : 'About' },
    { href: `/${lang}/services`, icon: Briefcase, label: lang === 'ar' ? 'خدماتنا' : 'Services' },
    { href: `/${lang}/portfolio`, icon: Image, label: lang === 'ar' ? 'أعمالنا' : 'Portfolio' },
    { href: `/${lang}/contact`, icon: MessageCircle, label: lang === 'ar' ? 'تواصل' : 'Contact' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== `/${lang}` && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                isActive ? 'text-primary-500' : 'text-muted-foreground'
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
