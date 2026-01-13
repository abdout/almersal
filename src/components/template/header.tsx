'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n';

interface HeaderProps {
  lang: Locale;
  dictionary: {
    nav: {
      home: string;
      about: string;
      services: string;
      portfolio: string;
      contact: string;
    };
  };
}

export function Header({ lang, dictionary }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = lang === 'ar';

  const navItems = [
    { href: `/${lang}`, label: dictionary.nav.home },
    { href: `/${lang}/about`, label: dictionary.nav.about },
    { href: `/${lang}/services`, label: dictionary.nav.services },
    { href: `/${lang}/portfolio`, label: dictionary.nav.portfolio },
    { href: `/${lang}/contact`, label: dictionary.nav.contact },
  ];

  return (
    <>
      {/* Header with Notch Design */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="relative flex items-start justify-center">
          {/* Notch Container - the white curved cutout */}
          <div className="relative pointer-events-auto">
            {/* The notch shape */}
            <div className="relative bg-background px-8 pb-4 pt-2 rounded-b-[24px] shadow-lg">
              {/* Small 2px line at top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary-500 rounded-full" />

              {/* Logo */}
              <Link href={`/${lang}`} className="flex flex-col items-center gap-1">
                {/* Logo Icon - stylized lines like reference */}
                <div className="flex items-end gap-[2px] h-8">
                  <div className="w-1 h-4 bg-primary-500 rounded-t-sm" />
                  <div className="w-1 h-6 bg-primary-500 rounded-t-sm" />
                  <div className="w-1 h-8 bg-primary-500 rounded-t-sm" />
                  <div className="w-1 h-6 bg-primary-500 rounded-t-sm" />
                  <div className="w-1 h-4 bg-primary-500 rounded-t-sm" />
                </div>
                <span className="text-xs font-bold tracking-wider text-primary-500">ALMERSAL</span>
              </Link>
            </div>

            {/* Curved edges connecting to transparent sides */}
            <div className="absolute -left-6 top-0 w-6 h-full">
              <div className="absolute top-0 right-0 w-6 h-6 bg-background rounded-tr-[24px]" />
              <div className="absolute top-0 right-0 w-6 h-6 bg-transparent" style={{ boxShadow: '6px 0 0 0 var(--background)' }} />
            </div>
            <div className="absolute -right-6 top-0 w-6 h-full">
              <div className="absolute top-0 left-0 w-6 h-6 bg-background rounded-tl-[24px]" />
              <div className="absolute top-0 left-0 w-6 h-6 bg-transparent" style={{ boxShadow: '-6px 0 0 0 var(--background)' }} />
            </div>
          </div>
        </div>

        {/* Hamburger Menu Button - floating on the right */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'absolute top-4 p-3 bg-primary-500 rounded-lg pointer-events-auto transition-colors hover:bg-primary-600',
            isRTL ? 'left-4' : 'right-4'
          )}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={cn('block h-0.5 bg-white transition-all', isOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5')} />
            <span className={cn('block h-0.5 bg-white transition-all', isOpen ? 'opacity-0' : 'w-4')} />
            <span className={cn('block h-0.5 bg-white transition-all', isOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-3')} />
          </div>
        </button>

        {/* Language Switcher - floating on the opposite side */}
        <Link
          href={isRTL ? '/en' : '/ar'}
          className={cn(
            'absolute top-4 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg pointer-events-auto text-sm font-medium text-white hover:bg-white/20 transition-colors',
            isRTL ? 'right-4' : 'left-4'
          )}
        >
          {isRTL ? 'EN' : 'AR'}
        </Link>
      </header>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-primary-500"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-bold text-white hover:text-white/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Language switch in menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                <Link
                  href={isRTL ? '/en' : '/ar'}
                  onClick={() => setIsOpen(false)}
                  className="mt-8 px-6 py-3 border-2 border-white rounded-full text-white font-bold hover:bg-white hover:text-primary-500 transition-colors"
                >
                  {isRTL ? 'English' : 'العربية'}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
