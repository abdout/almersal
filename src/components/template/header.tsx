'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">المرسال</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary-500 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href={isRTL ? '/en' : '/ar'}
              className="text-sm font-medium text-muted-foreground hover:text-primary-500 transition-colors"
            >
              {isRTL ? 'EN' : 'عربي'}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block py-3 px-4 rounded-lg text-foreground/80 hover:bg-muted hover:text-primary-500 transition-colors font-medium',
                      isRTL && 'text-right'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
