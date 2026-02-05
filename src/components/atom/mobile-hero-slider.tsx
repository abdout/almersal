'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventBadge } from '@/components/atom/event-badge';

interface Slide {
  id: string;
  overlayColor: string;
}

interface MobileHeroSliderProps {
  slides?: Slide[];
  className?: string;
  locale?: 'ar' | 'en';
  dictionary?: {
    visionStatement?: string;
    leftText?: string;
    rightText?: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
  };
  onColorChange?: (color: string) => void;
  showBadge?: boolean;
}

// Default placeholder slides
const placeholderSlides: Slide[] = [
  { id: '1', overlayColor: '#ED6C00' },
  { id: '2', overlayColor: '#2639A6' },
  { id: '3', overlayColor: '#CC2525' },
  { id: '4', overlayColor: '#139A39' },
  { id: '5', overlayColor: '#FFD900' },
  { id: '6', overlayColor: '#139A39' },
  { id: '7', overlayColor: '#2639A6' },
];

// Slide dimensions - single centered slide (larger for prominence)
const SLIDE_WIDTH = 300;
const SLIDE_HEIGHT = 470;
const DRAG_THRESHOLD = 50;
const AUTO_PLAY_INTERVAL = 6000; // 6 seconds for timer animation

export function MobileHeroSlider({
  slides = placeholderSlides,
  className,
  locale = 'ar',
  dictionary,
  onColorChange,
  showBadge = true,
}: MobileHeroSliderProps) {
  const fontFamily = locale === 'en' ? 'var(--font-geist-sans)' : 'var(--font-rubik)';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [timerKey, setTimerKey] = useState(0); // Reset timer animation on slide change
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      paginate(1);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Reset timer animation when slide changes
  useEffect(() => {
    setTimerKey(prev => prev + 1);
    // Reset auto-play timer on manual navigation
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        paginate(1);
      }, AUTO_PLAY_INTERVAL);
    }
  }, [currentIndex]);

  // Notify parent of color changes
  useEffect(() => {
    if (onColorChange && slides[currentIndex]?.overlayColor) {
      onColorChange(slides[currentIndex].overlayColor);
    }
  }, [currentIndex, slides, onColorChange]);

  const paginate = useCallback((newDirection: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === slides.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? slides.length - 1 : prev - 1;
    });

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 400);
  }, [slides.length]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info;
    if (offset.x < -DRAG_THRESHOLD) {
      paginate(1);
    } else if (offset.x > DRAG_THRESHOLD) {
      paginate(-1);
    }
  };

  const currentSlide = slides[currentIndex];

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  // Split text for vertical display
  const leftTextLines = (dictionary?.leftText || 'جريء\nللإبداع').split('\n');
  const rightTextLines = (dictionary?.rightText || 'علامة\nللهوية').split('\n');

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
      style={{ fontFamily }}
    >
      {/* Left Vertical Text - moved up, bigger */}
      <div className="absolute left-3 top-[4%] z-20 pointer-events-none">
        <div className="flex flex-col items-start">
          <span className="text-white font-black text-4xl leading-tight">
            {leftTextLines[0]}
          </span>
          {leftTextLines[1] && (
            <span className="text-white font-black text-xl [writing-mode:vertical-rl] mt-2 tracking-wider">
              {leftTextLines[1]}
            </span>
          )}
        </div>
      </div>

      {/* Right Vertical Text - moved up, bigger */}
      <div className="absolute right-3 top-[4%] z-20 pointer-events-none">
        <div className="flex flex-col items-end">
          <span className="text-white font-black text-4xl leading-tight">
            {rightTextLines[0]}
          </span>
          {rightTextLines[1] && (
            <span className="text-white font-black text-xl [writing-mode:vertical-rl] rotate-180 mt-2 tracking-wider">
              {rightTextLines[1]}
            </span>
          )}
        </div>
      </div>

      {/* Timer-Based Indicators - Left side, aligned with bottom of slide */}
      <div className="absolute left-3 bottom-[22%] z-20 flex flex-col items-center gap-2">
        {slides.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => {
                if (isAnimatingRef.current) return;
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={cn(
                "relative transition-all duration-300",
                isActive ? "w-6 h-6" : "w-2 h-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            >
              {!isActive && (
                <div className="absolute inset-0 rounded-full bg-white/40" />
              )}
              {isActive && (
                <>
                  {/* Timer circle with progress animation */}
                  <svg
                    key={timerKey}
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 24 24"
                  >
                    {/* Background circle */}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                    />
                    {/* Animated progress circle */}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeDasharray={2 * Math.PI * 10}
                      strokeDashoffset={2 * Math.PI * 10}
                      className="animate-timer-progress"
                    />
                  </svg>
                  {/* Center square dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-[1px]" />
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Centered Single Slide */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom: '8vh' }}>
        <div
          className="relative"
          style={{ width: SLIDE_WIDTH, height: SLIDE_HEIGHT }}
        >
          {/* Slide Content */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 rounded-[24px] bg-white cursor-grab active:cursor-grabbing overflow-hidden shadow-2xl"
            />
          </AnimatePresence>

          {/* Navigation Arrows - pill shape, at slide edges */}
          <button
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-11 h-9 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-30"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
          >
            <ChevronLeft
              className="w-5 h-5"
              style={{ color: currentSlide?.overlayColor || '#ED6C00' }}
            />
          </button>

          <button
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-11 h-9 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform z-30"
            onClick={() => paginate(1)}
            aria-label="Next slide"
          >
            <ChevronRight
              className="w-5 h-5"
              style={{ color: currentSlide?.overlayColor || '#ED6C00' }}
            />
          </button>

          {/* Event Badge - bottom right of slide, scaled up */}
          {showBadge && (
            <div className="absolute -bottom-6 -right-10 z-40 scale-[0.65] origin-bottom-right">
              <EventBadge heroColor={currentSlide?.overlayColor} />
            </div>
          )}
        </div>
      </div>

      {/* Description Text - aligned start */}
      <div className="absolute bottom-[10%] left-4 right-24 z-20">
        <p className="text-white text-sm leading-relaxed text-start">
          {dictionary?.visionStatement || 'نصنع محتوى إعلامي مبتكر يعكس هوية عملائنا ويصل إلى قلوب الجمهور'}
        </p>
      </div>

      {/* CTA Buttons - Yellow and Blue like desktop hero */}
      <div className="absolute bottom-5 left-4 right-24 z-30 flex gap-2 items-center">
        {/* Yellow Button - Book Now */}
        <button
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md font-bold text-xs shadow-lg active:scale-95 transition-transform"
          style={{ backgroundColor: '#FFD900', color: '#000' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dictionary?.ctaPrimary || 'احجز الآن'}
        </button>
        {/* Blue Button - Request */}
        <button
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md font-bold text-xs shadow-lg active:scale-95 transition-transform"
          style={{ backgroundColor: '#2639A6', color: '#fff' }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {dictionary?.ctaSecondary || 'طلب الملف'}
        </button>
      </div>

    </div>
  );
}
