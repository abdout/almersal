'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHeroColor } from '@/components/template/hero-color-context';

const MAIN_ORANGE = '#ED6C00';
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
  const { heroColor, isPastHeroSection } = useHeroColor();
  const isRTL = lang === 'ar';

  // Colors for bar and notch - white when in hero/pickup, orange when past
  const barColor = isPastHeroSection ? MAIN_ORANGE : 'white';
  const notchBgColor = isPastHeroSection ? MAIN_ORANGE : 'white';
  const hamburgerColor = isPastHeroSection ? 'white' : heroColor;

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
      {/* Header with 8px bar and center notch - color transitions based on scroll */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* 8px bar edge to edge - animates from white to orange */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[8px]"
          animate={{ backgroundColor: barColor }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Main header content */}
        <div className="relative">
          {/* Center Notch with Hamburger Menu - entire notch is clickable */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto">
            {/* Notch shape - animates from white to orange */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="group relative px-6 pt-2 pb-4 rounded-b-[10px] transition-all duration-300 ease-out hover:pb-6 cursor-pointer"
              animate={{ backgroundColor: notchBgColor }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Two-line Menu Icon */}
              <div className="flex flex-col items-center justify-center gap-[5px] p-1 mt-1 transition-transform duration-300 group-hover:translate-y-1">
                <motion.span
                  className="block h-[2.5px] w-5 rounded-full"
                  animate={{ backgroundColor: hamburgerColor }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
                <motion.span
                  className="block h-[2.5px] w-5 rounded-full"
                  animate={{ backgroundColor: hamburgerColor }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>

            {/* Inverse rounded corner - left side */}
            <div className="absolute -left-[8px] top-[8px] w-[8px] h-[8px] overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-[16px] h-[16px] rounded-tr-[8px]"
                animate={{ boxShadow: `4px -4px 0 0 ${barColor}` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Inverse rounded corner - right side */}
            <div className="absolute -right-[8px] top-[8px] w-[8px] h-[8px] overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-[16px] h-[16px] rounded-tl-[8px]"
                animate={{ boxShadow: `-4px -4px 0 0 ${barColor}` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Logo on the left (or right for RTL) */}
          <Link
            href={`/${lang}`}
            className={cn(
              'absolute top-3 flex items-center gap-2 md:gap-3 pointer-events-auto',
              isRTL ? 'right-4 md:right-6' : 'left-4 md:left-6'
            )}
          >
            <motion.div
              animate={{
                filter: isPastHeroSection
                  ? 'brightness(0) saturate(100%) invert(44%) sepia(99%) saturate(1441%) hue-rotate(7deg) brightness(101%) contrast(103%)'
                  : 'none'
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Image
                src="/logo.png"
                alt={isRTL ? 'المرسال' : 'Almersal'}
                width={160}
                height={56}
                className="h-10 md:h-14 w-auto"
                priority
              />
            </motion.div>
            <motion.span
              className="hidden md:block text-3xl font-extrabold tracking-wider"
              animate={{ color: isPastHeroSection ? '#000000' : '#ffffff' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {isRTL ? 'المرسال' : 'Almersal'}
            </motion.span>
          </Link>

          {/* CTA Buttons on the opposite side - hidden on mobile */}
          <div
            className={cn(
              'absolute top-5 hidden md:flex items-center gap-3 pointer-events-auto',
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
            className="fixed top-0 left-0 right-0 h-screen md:h-[80vh] z-[60] rounded-b-[2rem] md:rounded-b-[3rem] bg-[#ED6C00] flex flex-col overflow-visible"
          >
            {/* Scrollable content wrapper */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pb-8">
            {/* Top Section: Logo centered with sitename below */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pt-4 md:pt-6 pb-2 md:pb-4 flex flex-col items-center"
            >
              <Link href={`/${lang}`} onClick={() => setIsOpen(false)} className="flex flex-col items-center">
                <Image
                  src="/logo.png"
                  alt={isRTL ? 'المرسال' : 'Almersal'}
                  width={80}
                  height={60}
                  className="h-10 md:h-14 w-auto"
                />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white mt-1 uppercase">
                  {isRTL ? 'المرسال' : 'ALMERSAL'}
                </span>
              </Link>
            </motion.div>

            {/* Responsive Grid - 1 col mobile, 3 col desktop */}
            <div className={cn(
              'grid gap-4 md:gap-8 px-4 md:px-12 mt-2 md:mt-4 flex-1 pb-16 md:pb-0',
              'grid-cols-1 lg:grid-cols-[1.7fr_1fr_1fr]',
              isRTL ? 'direction-rtl' : ''
            )}
            >
              {/* Navigation Items with Arrows */}
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
                      'flex items-center justify-between py-4 lg:py-6 border-b border-white/20 text-white',
                      isRTL && 'flex-row-reverse'
                    )}
                  >
                    <span className="text-lg lg:text-xl font-bold">
                      {item.label}
                    </span>
                    <span className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border border-white/50 flex items-center justify-center">
                      {isRTL ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="lg:w-3 lg:h-3">
                          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="lg:w-3 lg:h-3">
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
                className="lg:col-span-2 flex flex-col gap-4 md:gap-10"
              >
                {/* CTA Buttons - Stack on mobile, row on desktop */}
                <div className={cn('flex flex-col md:flex-row gap-3', isRTL && 'md:flex-row-reverse')}>
                  {/* Book Now - Yellow */}
                  <Link
                    href={`/${lang}/contact`}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center h-14 md:h-24 px-6 md:px-10 rounded-md font-bold text-sm md:text-[16px] overflow-hidden md:flex-1"
                    style={{ backgroundColor: '#FFD900', color: '#000' }}
                  >
                    {/* Default state: Icon + Text */}
                    <span className="flex items-center gap-2 md:gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:translate-x-4">
                      <CalendarIcon size={18} className="md:w-[22px] md:h-[22px]" />
                      <span>{isRTL ? 'احجز الآن' : 'Book Now'}</span>
                    </span>
                    {/* Hover state: Circle + Text */}
                    <span className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 opacity-0 -translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-black rounded-full">
                        <ExternalLinkIcon size={10} className="md:w-3 md:h-3 text-[#FFD900]" />
                      </span>
                      <span>{isRTL ? 'احجز الآن' : 'Book Now'}</span>
                    </span>
                  </Link>

                  {/* Request - Blue */}
                  <Link
                    href={`/${lang}/portfolio`}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center h-14 md:h-24 px-6 md:px-10 rounded-md font-bold text-sm md:text-[16px] text-white overflow-hidden md:flex-1"
                    style={{ backgroundColor: '#2639A6' }}
                  >
                    {/* Default state: Icon + Text */}
                    <span className="flex items-center gap-2 md:gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:translate-x-4">
                      <DocumentIcon size={16} className="md:w-5 md:h-5 text-white" />
                      <span>{isRTL ? 'طلب الملف' : 'Request'}</span>
                    </span>
                    {/* Hover state: Circle + Text */}
                    <span className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 opacity-0 -translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-white rounded-full">
                        <ButtonArrowIcon size={10} className="md:w-3 md:h-3 text-[#2639A6]" />
                      </span>
                      <span>{isRTL ? 'طلب الملف' : 'Request'}</span>
                    </span>
                  </Link>

                  {/* Access/Location - White */}
                  <Link
                    href={`/${lang}/contact#location`}
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center h-14 md:h-24 px-6 md:px-10 rounded-md font-bold text-sm md:text-[16px] text-[#ED6C00] bg-white overflow-hidden md:flex-1"
                  >
                    {/* Default state: Icon + Text */}
                    <span className="flex items-center gap-2 md:gap-3 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-0 group-hover:translate-x-4">
                      <LocationPinFilledIcon size={18} className="md:w-[22px] md:h-[22px] text-[#ED6C00]" />
                      <span>{isRTL ? 'الموقع' : 'Access'}</span>
                    </span>
                    {/* Hover state: Circle + Text */}
                    <span className="absolute inset-0 flex items-center justify-center gap-2 md:gap-3 opacity-0 -translate-x-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-[#ED6C00] rounded-full">
                        <ButtonArrowIcon size={10} className="md:w-3 md:h-3 text-white" />
                      </span>
                      <span>{isRTL ? 'الموقع' : 'Access'}</span>
                    </span>
                  </Link>
                </div>

                {/* Categories and Contact - responsive layout */}
                <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6', isRTL && 'direction-rtl')}>
                  {/* Categories - Desktop: Table grid, Mobile: Simple list */}
                  <div className="flex flex-col">
                    {/* Desktop Categories Grid */}
                    <div className="hidden md:block">
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
                    {/* Mobile Categories - Simple horizontal list */}
                    <div className="md:hidden flex flex-wrap gap-2 justify-center">
                      {[
                        { href: `/${lang}/services`, ar: 'جميع الخدمات', en: 'All Services' },
                        { href: `/${lang}/services#video`, ar: 'فيديو', en: 'Video' },
                        { href: `/${lang}/services#photo`, ar: 'تصوير', en: 'Photo' },
                        { href: `/${lang}/services#design`, ar: 'تصميم', en: 'Design' },
                      ].map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-2 text-xs font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors"
                        >
                          {isRTL ? cat.ar : cat.en}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Contact Box - Simplified on mobile */}
                  <div className="flex flex-col">
                    <div className="bg-white rounded-lg p-4 md:p-6 md:py-[1.875rem] flex flex-col items-center justify-center text-center">
                      {/* Header Text - Hidden on mobile */}
                      <p className="hidden md:block text-gray-600 text-xs mb-3 leading-relaxed max-w-[180px]">
                        {isRTL
                          ? 'للاستفسارات والحجوزات، تواصلوا معنا عبر الهاتف أو النموذج الإلكتروني'
                          : 'For inquiries and bookings, contact us by phone or through the web form'}
                      </p>

                      {/* Large Phone Number */}
                      <div className="mb-2" dir="ltr">
                        <span className="text-[#ED6C00] text-sm md:text-base font-medium">Tel. </span>
                        <span className="text-[#ED6C00] text-xl md:text-3xl font-bold tracking-wide">
                          050-123-4567
                        </span>
                      </div>

                      {/* Hours - Simplified on mobile */}
                      <div className="flex items-center gap-2 mb-3 md:mb-4 text-gray-500 text-[10px] md:text-xs">
                        <span>{isRTL ? 'الأحد - الخميس 9:00 - 17:00' : 'Sun - Thu 9:00 - 17:00'}</span>
                      </div>

                      {/* Contact Button - Orange */}
                      <Link
                        href={`/${lang}/contact`}
                        onClick={() => setIsOpen(false)}
                        className="inline-block px-6 md:px-8 py-2 md:py-2.5 bg-[#ED6C00] text-white font-bold text-xs md:text-sm text-center rounded-full hover:bg-[#ED6C00]/90 transition-colors"
                      >
                        {isRTL ? 'تواصل معنا' : 'Contact Us'}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Social Icons + Footer Links - Responsive layout */}
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-3 md:gap-0">
                  {/* Social Icons */}
                  <div className="flex items-center gap-2 md:gap-3">
                    {[
                      { icon: InstagramIcon, href: 'https://instagram.com/almersal', size: 16, label: 'Instagram' },
                      { icon: XIcon, href: 'https://x.com/almersal', size: 14, label: 'X' },
                      { icon: FacebookIcon, href: 'https://facebook.com/almersal', size: 10, label: 'Facebook' },
                      { icon: LineIcon, href: 'https://line.me/almersal', size: 17, label: 'Line' },
                      { icon: TikTokIcon, href: 'https://tiktok.com/@almersal', size: 14, label: 'TikTok' },
                    ].map(({ icon: Icon, href, size, label }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white text-[#ED6C00] hover:bg-white/90 transition-all"
                        aria-label={label}
                      >
                        <Icon size={size} className="md:w-[18px] md:h-[18px]" />
                      </a>
                    ))}
                  </div>

                  {/* Footer Links */}
                  <div className="flex items-center gap-3 md:gap-4 text-white/50 text-[10px] md:text-xs">
                    <Link
                      href={`/${lang}/privacy`}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-white transition-colors"
                    >
                      {isRTL ? 'الخصوصية' : 'Privacy'}
                    </Link>
                    <Link
                      href={`/${lang}/terms`}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-white transition-colors"
                    >
                      {isRTL ? 'الشروط' : 'Terms'}
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
            </div>
            {/* End scrollable content wrapper */}

            {/* Close Button - White Circle at Bottom Center, overflows beyond menu */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
              aria-label={isRTL ? 'إغلاق القائمة' : 'Close menu'}
            >
              <CrossIcon size={20} className="md:w-6 md:h-6 text-[#ED6C00]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
