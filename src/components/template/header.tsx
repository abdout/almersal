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
      {/* Header with 4px white bar and center notch */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* 4px white bar edge to edge */}
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-white" />

        {/* Main header content */}
        <div className="relative">
          {/* Center Notch with Hamburger Menu - Simple square with rounded bottom */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto">
            <div className="bg-white px-5 pt-1 pb-3 rounded-b-lg">
              {/* Two-line Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col items-center justify-center gap-1.5 p-2"
                aria-label="Toggle menu"
              >
                <span className={cn(
                  'block h-[2px] w-5 bg-primary-500 transition-all duration-300',
                  isOpen && 'rotate-45 translate-y-[5px]'
                )} />
                <span className={cn(
                  'block h-[2px] w-5 bg-primary-500 transition-all duration-300',
                  isOpen && '-rotate-45 -translate-y-[5px]'
                )} />
              </button>
            </div>
          </div>

          {/* Logo on the left (or right for RTL) */}
          <Link
            href={`/${lang}`}
            className={cn(
              'absolute top-3 flex items-center gap-2 pointer-events-auto',
              isRTL ? 'right-4' : 'left-4'
            )}
          >
            {/* Logo Icon - stylized bars */}
            <div className="flex items-end gap-[2px] h-6">
              <div className="w-[3px] h-3 bg-white rounded-t-sm" />
              <div className="w-[3px] h-4 bg-white rounded-t-sm" />
              <div className="w-[3px] h-6 bg-white rounded-t-sm" />
              <div className="w-[3px] h-4 bg-white rounded-t-sm" />
              <div className="w-[3px] h-3 bg-white rounded-t-sm" />
            </div>
            <span className="text-sm font-bold tracking-wider text-white">المرسال</span>
          </Link>

          {/* Language Switcher on the opposite side */}
          <Link
            href={isRTL ? '/en' : '/ar'}
            className={cn(
              'absolute top-3 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg pointer-events-auto text-sm font-medium text-white hover:bg-white/20 transition-colors',
              isRTL ? 'left-4' : 'right-4'
            )}
          >
            {isRTL ? 'EN' : 'AR'}
          </Link>
        </div>
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
