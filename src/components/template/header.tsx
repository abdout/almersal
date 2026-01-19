'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHeroColor } from '@/components/template/hero-color-context';
import {
  CalendarIcon,
  DocumentIcon,
  ExternalLinkIcon,
  ButtonArrowIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CrossIcon,
  PhoneIcon,
  ClockIcon,
  InstagramIcon,
  XIcon,
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
  LocationPinIcon,
  LocationPinFilledIcon,
  LineIcon,
} from '@/components/atom/icons';
import type { Locale, Dictionary } from '@/lib/i18n';

interface HeaderProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function Header({ lang, dictionary }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { heroColor } = useHeroColor();
  const isRTL = lang === 'ar';

  const navItems = [
    { href: `/${lang}`, label: dictionary.nav.home },
    { href: `/${lang}/about`, label: dictionary.nav.about },
    { href: `/${lang}/services`, label: dictionary.nav.services },
    { href: `/${lang}/portfolio`, label: dictionary.nav.portfolio },
    { href: `/${lang}/blog`, label: isRTL ? 'المدونة' : 'Blog' },
    { href: `/${lang}/contact`, label: dictionary.nav.contact },
  ];

  return (
    <>
      {/* Header with 8px white bar and center notch */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* 8px white bar edge to edge */}
        <div className="absolute top-0 left-0 right-0 h-[8px] bg-white" />

        {/* Main header content */}
        <div className="relative">
          {/* Center Notch with Hamburger Menu */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto">
            {/* Notch shape - white background with smooth rounded bottom */}
            <div className="group relative bg-white px-6 pt-2 pb-4 rounded-b-[10px] transition-all duration-300 ease-out hover:pb-6">
              {/* Two-line Menu Button - no X animation since close button is at bottom */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-col items-center justify-center gap-[5px] p-1 mt-1 transition-transform duration-300 group-hover:translate-y-1"
                aria-label="Toggle menu"
              >
                <span
                  className="block h-[2.5px] w-5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: heroColor }}
                />
                <span
                  className="block h-[2.5px] w-5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: heroColor }}
                />
              </button>
            </div>

            {/* Inverse rounded corner - left side */}
            <div className="absolute -left-[8px] top-[8px] w-[8px] h-[8px] overflow-hidden">
              <div className="absolute top-0 right-0 w-[16px] h-[16px] rounded-tr-[8px] shadow-[4px_-4px_0_0_white]" />
            </div>

            {/* Inverse rounded corner - right side */}
            <div className="absolute -right-[8px] top-[8px] w-[8px] h-[8px] overflow-hidden">
              <div className="absolute top-0 left-0 w-[16px] h-[16px] rounded-tl-[8px] shadow-[-4px_-4px_0_0_white]" />
            </div>
          </div>

          {/* Logo on the left (or right for RTL) */}
          <Link
            href={`/${lang}`}
            className={cn(
              'absolute top-3 flex items-center gap-3 pointer-events-auto',
              isRTL ? 'right-6' : 'left-6'
            )}
          >
            <Image
              src="/logo.png"
              alt={isRTL ? 'المرسال' : 'Almersal'}
              width={160}
              height={56}
              className="h-14 w-auto"
              priority
            />
            <span className="text-3xl font-extrabold tracking-wider text-white">
              {isRTL ? 'المرسال' : 'Almersal'}
            </span>
          </Link>

          {/* CTA Buttons on the opposite side */}
          <div
            className={cn(
              'absolute top-5 flex items-center gap-3 pointer-events-auto',
              isRTL ? 'left-6 flex-row-reverse' : 'right-6'
            )}
          >
            {/* Book Now Button - YELLOW */}
            <Link
              href={`/${lang}/contact`}
              className="group relative flex items-center justify-center h-12 w-[160px] rounded-full overflow-hidden"
              style={{ backgroundColor: '#FFD900' }}
            >
              {/* Icon + Text group - centered together */}
              <span className={cn(
                'flex items-center gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                'group-hover:opacity-0 group-hover:-translate-x-4'
              )}>
                <CalendarIcon size={18} />
                <span className="text-[15px] font-bold text-black whitespace-nowrap">
                  {isRTL ? 'احجز الآن' : 'Book Now'}
                </span>
              </span>
              {/* Hover state: Text + Circle - centered together */}
              <span className={cn(
                'absolute inset-0 flex items-center justify-center gap-3',
                'opacity-0 translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                'group-hover:opacity-100 group-hover:translate-x-0'
              )}>
                <span className="text-[15px] font-bold text-black whitespace-nowrap">
                  {isRTL ? 'احجز الآن' : 'Book Now'}
                </span>
                <span className="flex items-center justify-center w-6 h-6 bg-black rounded-full">
                  <ExternalLinkIcon size={10} className="text-[#FFD900]" />
                </span>
              </span>
            </Link>

            {/* Request Button - BLUE */}
            <Link
              href={`/${lang}/portfolio`}
              className="group relative flex items-center justify-center h-12 w-[150px] rounded-full overflow-hidden"
              style={{ backgroundColor: '#2639A6' }}
            >
              {/* Icon + Text group - centered together */}
              <span className={cn(
                'flex items-center gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                'group-hover:opacity-0 group-hover:-translate-x-4'
              )}>
                <DocumentIcon size={18} className="text-white" />
                <span className="text-[15px] font-bold text-white whitespace-nowrap">
                  {isRTL ? 'طلب الملف' : 'Request'}
                </span>
              </span>
              {/* Hover state: Text + Circle - centered together */}
              <span className={cn(
                'absolute inset-0 flex items-center justify-center gap-3',
                'opacity-0 translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                'group-hover:opacity-100 group-hover:translate-x-0'
              )}>
                <span className="text-[15px] font-bold text-white whitespace-nowrap">
                  {isRTL ? 'طلب الملف' : 'Request'}
                </span>
                <span className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
                  <ButtonArrowIcon size={10} className={cn('text-[#2639A6]', isRTL && 'rotate-180')} />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Overlay Menu - 80% height with rounded bottom, z-[60] to cover header */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 right-0 h-[80vh] z-[60] rounded-b-[3rem] bg-[#ED6C00] flex flex-col"
          >
            {/* Top Section: Logo centered with sitename below */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pt-6 pb-4 flex flex-col items-center"
            >
              <Link href={`/${lang}`} onClick={() => setIsOpen(false)} className="flex flex-col items-center">
                <Image
                  src="/logo.png"
                  alt={isRTL ? 'المرسال' : 'Almersal'}
                  width={80}
                  height={60}
                  className="h-14 w-auto"
                />
                <span className="text-xs font-bold tracking-[0.2em] text-white mt-1 uppercase">
                  {isRTL ? 'المرسال' : 'ALMERSAL'}
                </span>
              </Link>
            </motion.div>

            {/* 3-Column Grid - Nav aligned with buttons */}
            <div className={cn(
              'grid gap-8 px-12 mt-4 flex-1',
              isRTL ? 'direction-rtl' : ''
            )}
            style={{ gridTemplateColumns: '1.7fr 1fr 1fr' }}
            >
              {/* Left Column: Navigation Items with Arrows - starts at same level as buttons */}
              <motion.nav
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col border-t border-white/20"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center justify-between py-6 border-b border-white/20 text-white',
                      isRTL && 'flex-row-reverse'
                    )}
                  >
                    <span className="text-xl font-bold">
                      {item.label}
                    </span>
                    <span className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center">
                      {isRTL ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                  </Link>
                ))}
              </motion.nav>

              {/* Middle + Right: Buttons on top, then Categories and Contact below */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="col-span-2 flex flex-col gap-10"
              >
                {/* CTA Buttons Row */}
                <div className={cn('flex gap-3', isRTL && 'flex-row-reverse')}>
                  {/* Book Now - Yellow */}
                  <Link
                    href={`/${lang}/contact`}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center h-24 px-10 rounded-md font-bold text-[16px] overflow-hidden flex-1"
                    style={{ backgroundColor: '#FFD900', color: '#000' }}
                  >
                    {/* Default state: Icon + Text */}
                    <span className="flex items-center gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:translate-x-4">
                      <CalendarIcon size={22} />
                      <span>{isRTL ? 'احجز الآن' : 'Book Now'}</span>
                    </span>
                    {/* Hover state: Circle + Text */}
                    <span className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 -translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="flex items-center justify-center w-7 h-7 bg-black rounded-full">
                        <ExternalLinkIcon size={12} className="text-[#FFD900]" />
                      </span>
                      <span>{isRTL ? 'احجز الآن' : 'Book Now'}</span>
                    </span>
                  </Link>

                  {/* Request - Blue */}
                  <Link
                    href={`/${lang}/portfolio`}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center h-24 px-10 rounded-md font-bold text-[16px] text-white overflow-hidden flex-1"
                    style={{ backgroundColor: '#2639A6' }}
                  >
                    {/* Default state: Icon + Text */}
                    <span className="flex items-center gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:translate-x-4">
                      <DocumentIcon size={20} className="text-white" />
                      <span>{isRTL ? 'طلب الملف' : 'Request'}</span>
                    </span>
                    {/* Hover state: Circle + Text */}
                    <span className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 -translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="flex items-center justify-center w-7 h-7 bg-white rounded-full">
                        <ButtonArrowIcon size={12} className="text-[#2639A6]" />
                      </span>
                      <span>{isRTL ? 'طلب الملف' : 'Request'}</span>
                    </span>
                  </Link>

                  {/* Access/Location - White */}
                  <Link
                    href={`/${lang}/contact#location`}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center h-24 px-10 rounded-md font-bold text-[16px] text-[#ED6C00] bg-white overflow-hidden flex-1"
                  >
                    {/* Default state: Icon + Text */}
                    <span className="flex items-center gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:translate-x-4">
                      <LocationPinFilledIcon size={22} className="text-[#ED6C00]" />
                      <span>{isRTL ? 'الموقع' : 'Access'}</span>
                    </span>
                    {/* Hover state: Circle + Text */}
                    <span className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 -translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="flex items-center justify-center w-7 h-7 bg-[#ED6C00] rounded-full">
                        <ButtonArrowIcon size={12} className="text-white" />
                      </span>
                      <span>{isRTL ? 'الموقع' : 'Access'}</span>
                    </span>
                  </Link>
                </div>

                {/* Categories and Contact side by side */}
                <div className={cn('grid grid-cols-2 gap-6', isRTL && 'direction-rtl')}>
                  {/* Categories */}
                  <div className="flex flex-col">
                    {/* Categories - Table grid with shared borders */}
                    {(() => {
                      const cellClass = "text-white hover:bg-white/10 text-sm font-medium py-4 px-4 transition-colors text-center";
                      const innerCellClass = "text-white hover:bg-white/10 text-sm font-medium py-6 px-4 transition-colors text-center";
                      const categories = {
                        top: { href: `/${lang}/services`, ar: 'جميع الخدمات', en: 'All Services' },
                        grid: [
                          [
                            { href: `/${lang}/services#video`, ar: 'إنتاج الفيديو', en: 'Film & Motion' },
                            { href: `/${lang}/services#photo`, ar: 'التصوير', en: 'Photography' },
                          ],
                          [
                            { href: `/${lang}/services#design`, ar: 'التصميم', en: 'Design' },
                            { href: `/${lang}/services#social`, ar: 'التواصل', en: 'Social' },
                          ],
                        ],
                        bottom: { href: `/${lang}/services#branding`, ar: 'الهوية البصرية', en: 'Brand Identity' },
                      };
                      return (
                        <div className="border border-white/30 rounded-lg overflow-hidden">
                          <Link href={categories.top.href} onClick={() => setIsOpen(false)} className={`block ${cellClass} border-b border-white/30`}>
                            {isRTL ? categories.top.ar : categories.top.en}
                          </Link>
                          {categories.grid.map((row, i) => (
                            <div key={i} className="flex border-b border-white/30">
                              {row.map((cell, j) => (
                                <Link key={cell.href} href={cell.href} onClick={() => setIsOpen(false)} className={`flex-1 ${innerCellClass} ${j === 0 ? 'border-r border-white/30' : ''}`}>
                                  {isRTL ? cell.ar : cell.en}
                                </Link>
                              ))}
                            </div>
                          ))}
                          <Link href={categories.bottom.href} onClick={() => setIsOpen(false)} className={`block ${cellClass}`}>
                            {isRTL ? categories.bottom.ar : categories.bottom.en}
                          </Link>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Contact Box */}
                  <div className="flex flex-col">
                    <div className="bg-white rounded-lg p-6 py-[1.875rem] flex flex-col items-center justify-center text-center">
                      {/* Header Text */}
                      <p className="text-gray-600 text-xs mb-3 leading-relaxed max-w-[180px]">
                        {isRTL
                          ? 'للاستفسارات والحجوزات، تواصلوا معنا عبر الهاتف أو النموذج الإلكتروني'
                          : 'For inquiries and bookings, contact us by phone or through the web form'}
                      </p>

                      {/* Large Phone Number */}
                      <div className="mb-2" dir="ltr">
                        <span className="text-[#ED6C00] text-base font-medium">Tel. </span>
                        <span className="text-[#ED6C00] text-3xl font-bold tracking-wide">
                          050-123-4567
                        </span>
                      </div>

                      {/* Hours */}
                      <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs">
                        <span className="font-medium">{isRTL ? 'ساعات العمل' : 'Hours'}</span>
                        <span>{isRTL ? 'الأحد - الخميس 9:00 - 17:00' : 'Sun - Thu 9:00 - 17:00'}</span>
                      </div>

                      {/* Contact Button - Orange */}
                      <Link
                        href={`/${lang}/contact`}
                        onClick={() => setIsOpen(false)}
                        className="inline-block px-8 py-2.5 bg-[#ED6C00] text-white font-bold text-sm text-center rounded-full hover:bg-[#ED6C00]/90 transition-colors"
                      >
                        {isRTL ? 'تواصل عبر الموقع' : 'Contact via Web'}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Social Icons + Footer Links - Below Categories and Contact */}
                <div className="flex items-center justify-between">
                  {/* Social Icons - Left */}
                  <div className="flex items-center gap-3">
                    {[
                      { icon: InstagramIcon, href: 'https://instagram.com/almersal', size: 18 },
                      { icon: XIcon, href: 'https://x.com/almersal', size: 16 },
                      { icon: FacebookIcon, href: 'https://facebook.com/almersal', size: 11 },
                      { icon: LineIcon, href: 'https://line.me/almersal', size: 19 },
                      { icon: TikTokIcon, href: 'https://tiktok.com/@almersal', size: 16, label: 'TikTok' },
                    ].map(({ icon: Icon, href, size, label }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#ED6C00] hover:bg-white/90 transition-all"
                        aria-label={label}
                      >
                        <Icon size={size} />
                      </a>
                    ))}
                  </div>

                  {/* Footer Links - Right */}
                  <div className="flex items-center gap-4 text-white/50 text-xs">
                    <Link
                      href={`/${lang}/privacy`}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-white transition-colors"
                    >
                      {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
                    </Link>
                    <Link
                      href={`/${lang}/terms`}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-white transition-colors"
                    >
                      {isRTL ? 'الشروط والأحكام' : 'Terms'}
                    </Link>
                    {/* Language Switch */}
                    <Link
                      href={isRTL ? '/en' : '/ar'}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-white transition-colors font-medium"
                    >
                      {isRTL ? 'English' : 'العربية'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Scroll Down indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center text-white/40 text-xs mb-4"
            >
              <span>{isRTL ? 'تصفح للأسفل' : 'Scroll Down'}</span>
              <svg className="w-4 h-4 mt-1 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>

            {/* Close Button - White Circle at Bottom Center */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
              aria-label={isRTL ? 'إغلاق القائمة' : 'Close menu'}
            >
              <CrossIcon size={24} className="text-[#ED6C00]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
