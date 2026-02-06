'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroColor } from '@/components/template/hero-color-context';

const MAIN_ORANGE = '#ED6C00';

export function MobileBottomBar() {
  const { heroColor, currentSection, setIsMenuOpen, hasScrolled, setHasScrolled, isMenuOpen } = useHeroColor();

  // Track scroll position - show buttons when scrolled, hide when back at top
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== hasScrolled) {
        setHasScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled, setHasScrolled]);

  // Section-aware colors for bar and notch
  const isWhiteSection = currentSection === 'white';
  const barColor = isWhiteSection ? MAIN_ORANGE : 'white';
  const notchBgColor = isWhiteSection ? MAIN_ORANGE : 'white';
  // Icon: white on white sections, heroColor on colored sections
  const menuIconColor = isWhiteSection ? 'white' : (heroColor || MAIN_ORANGE);

  return (
    <AnimatePresence>
    {!isMenuOpen && (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none md:hidden"
    >
      {/* CTA Buttons - same style as hero section, show on scroll */}
      <AnimatePresence>
        {hasScrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute bottom-[16px] left-4 right-[88px] flex gap-3 pointer-events-auto"
          >
            {/* Yellow Button - Book Now (same as hero) */}
            <button
              className="flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-md font-bold text-sm shadow-lg active:scale-95 transition-transform"
              style={{ backgroundColor: '#FFD900', color: '#000' }}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </button>
            {/* Blue Button - Request (same as hero) */}
            <button
              className="flex items-center justify-center gap-1.5 px-8 py-3.5 rounded-md font-bold text-sm shadow-lg active:scale-95 transition-transform"
              style={{ backgroundColor: '#2639A6', color: '#fff' }}
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8px bar edge to edge - dynamic color */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[8px]"
        animate={{ backgroundColor: barColor }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      {/* Right-side Notch with Menu Icon - extends upward */}
      <div className="absolute right-4 bottom-0 pointer-events-auto">
        <motion.button
          onClick={() => setIsMenuOpen(true)}
          className="relative w-[72px] h-[36px] rounded-t-[10px] transition-all duration-300 ease-out cursor-pointer"
          animate={{ backgroundColor: notchBgColor }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-label="Menu"
        >
          {/* Two-line Menu Icon - absolutely centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[5px]">
            <motion.span
              className="block h-[2.5px] w-6 rounded-full"
              animate={{ backgroundColor: menuIconColor }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <motion.span
              className="block h-[2.5px] w-6 rounded-full"
              animate={{ backgroundColor: menuIconColor }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </motion.button>

        {/* Inverse rounded corner - left side */}
        <div className="absolute -left-[8px] bottom-[8px] w-[8px] h-[8px] overflow-hidden">
          <motion.div
            className="absolute bottom-0 right-0 w-[16px] h-[16px] rounded-br-[8px]"
            animate={{ boxShadow: `4px 4px 0 0 ${barColor}` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Inverse rounded corner - right side */}
        <div className="absolute -right-[8px] bottom-[8px] w-[8px] h-[8px] overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 w-[16px] h-[16px] rounded-bl-[8px]"
            animate={{ boxShadow: `-4px 4px 0 0 ${barColor}` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
