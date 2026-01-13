'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  video?: string;
  image?: string;
  title: string;
  subtitle?: string;
  leftText?: {
    main: string;
    sub: string;
  };
  rightText?: {
    main: string;
    sub: string;
  };
  overlayColor?: string;
}

interface VideoSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
}

// Orange color variations for each slide
const slideColors = [
  'oklch(0.65 0.2 45)', // Main orange
  'oklch(0.60 0.22 50)', // Slightly darker/warmer
  'oklch(0.70 0.18 40)', // Slightly lighter/cooler
  'oklch(0.58 0.24 55)', // Deep orange
  'oklch(0.68 0.20 42)', // Bright orange
];

export function VideoSlider({ slides, autoPlayInterval = 5000, className }: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        if (newDirection > 0) {
          return prev === slides.length - 1 ? 0 : prev + 1;
        }
        return prev === 0 ? slides.length - 1 : prev - 1;
      });
    },
    [slides.length]
  );

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleDragEnd = (_: never, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.y < -threshold) {
      paginate(1);
    } else if (info.offset.y > threshold) {
      paginate(-1);
    }
  };

  useEffect(() => {
    if (autoPlayInterval > 0) {
      autoPlayRef.current = setInterval(() => {
        paginate(1);
      }, autoPlayInterval);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlayInterval, paginate]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const currentColor = slides[currentIndex].overlayColor || slideColors[currentIndex % slideColors.length];

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
    >
      {/* Left Side Panel */}
      <motion.div
        key={`left-${currentIndex}`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-0 top-0 bottom-0 w-[20%] md:w-[18%] z-20 flex flex-col justify-center items-center"
        style={{ backgroundColor: currentColor }}
      >
        <div className="relative h-full flex flex-col justify-center items-center py-20">
          {/* Main Large Text - Vertical */}
          <div className="writing-mode-vertical flex flex-col items-center gap-4">
            <motion.span
              key={`left-main-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {slides[currentIndex].leftText?.main || 'الإبداع'}
            </motion.span>
            <motion.span
              key={`left-sub-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-white/90"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {slides[currentIndex].leftText?.sub || 'نصنعه'}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Right Side Panel */}
      <motion.div
        key={`right-${currentIndex}`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute right-0 top-0 bottom-0 w-[20%] md:w-[18%] z-20 flex flex-col justify-center items-center"
        style={{ backgroundColor: currentColor }}
      >
        <div className="relative h-full flex flex-col justify-center items-center py-20">
          {/* Main Large Text - Vertical */}
          <div className="writing-mode-vertical flex flex-col items-center gap-4">
            <motion.span
              key={`right-main-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {slides[currentIndex].rightText?.main || 'الهوية'}
            </motion.span>
            <motion.span
              key={`right-sub-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-white/90"
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {slides[currentIndex].rightText?.sub || 'نحققها'}
            </motion.span>
          </div>

          {/* Hamburger Menu Placeholder Area */}
          <div className="absolute top-4 right-4 w-10 h-10" />
        </div>
      </motion.div>

      {/* Center Slider Area */}
      <div className="absolute inset-0 left-[20%] right-[20%] md:left-[18%] md:right-[18%]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Background */}
            {slides[currentIndex].video ? (
              <video
                src={slides[currentIndex].video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
              />
            )}

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12 bg-gradient-to-t from-black/70 to-transparent">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-sm md:text-base text-white/90 max-w-xl leading-relaxed"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots - Inside right panel */}
      <div className="absolute right-[calc(20%+1rem)] md:right-[calc(18%+1rem)] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-[calc(20%+1rem)] md:right-[calc(18%+1rem)] bottom-8 flex flex-col gap-2 z-30">
        <button
          onClick={() => paginate(-1)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-white rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 left-[calc(20%+1rem)] md:left-[calc(18%+1rem)] text-white z-30">
        <span className="text-3xl font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="text-lg text-white/50 mx-2">/</span>
        <span className="text-lg text-white/50">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Open Campus Style Banner - Optional, matching reference */}
      <motion.div
        key={`banner-${currentIndex}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute top-24 left-[calc(20%+1rem)] md:left-[calc(18%+1rem)] z-30"
      >
        <div className="bg-white rounded-lg p-3 shadow-lg">
          <div className="text-xs text-gray-500 mb-1">Coming Soon</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-500">02.21</span>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary-500 text-white">SAT</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
