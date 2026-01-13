'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLoading } from '@/components/template/loading-context';

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
  const { setContentLoaded } = useLoading();

  // Preload first image and signal loading complete
  useEffect(() => {
    const firstSlide = slides[0];
    if (firstSlide?.image) {
      const img = new Image();
      img.onload = () => setContentLoaded();
      img.onerror = () => setContentLoaded(); // Still complete on error
      img.src = firstSlide.image;
    } else if (firstSlide?.video) {
      // For video, signal after a short delay
      const timeout = setTimeout(setContentLoaded, 500);
      return () => clearTimeout(timeout);
    } else {
      setContentLoaded();
    }
  }, [slides, setContentLoaded]);

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
        className="absolute left-0 top-0 bottom-0 w-[22%] md:w-[20%] z-20 flex flex-col justify-center items-center"
        style={{ backgroundColor: currentColor }}
      >
        <div className="relative h-full w-full flex flex-col justify-center items-center overflow-hidden">
          {/* Main Large Text - Horizontal like reference */}
          <div className="flex flex-col items-center justify-center text-center w-full">
            <motion.span
              key={`left-main-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-black text-white leading-none whitespace-nowrap"
            >
              {slides[currentIndex].leftText?.main || 'الإبداع'}
            </motion.span>
            <motion.span
              key={`left-sub-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mt-3"
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
        className="absolute right-0 top-0 bottom-0 w-[22%] md:w-[20%] z-20 flex flex-col justify-center items-center"
        style={{ backgroundColor: currentColor }}
      >
        <div className="relative h-full w-full flex flex-col justify-center items-center overflow-hidden">
          {/* Main Large Text - Horizontal like reference */}
          <div className="flex flex-col items-center justify-center text-center w-full">
            <motion.span
              key={`right-main-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-black text-white leading-none whitespace-nowrap"
            >
              {slides[currentIndex].rightText?.main || 'الهوية'}
            </motion.span>
            <motion.span
              key={`right-sub-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mt-3"
            >
              {slides[currentIndex].rightText?.sub || 'نحققها'}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Center Slider Area */}
      <div className="absolute inset-0 left-[22%] right-[22%] md:left-[20%] md:right-[20%]">
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
            {/* Background Image/Video */}
            {slides[currentIndex].video ? (
              <video
                src={slides[currentIndex].video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : slides[currentIndex].image ? (
              <img
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-800" />
            )}

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-base md:text-lg lg:text-xl text-white max-w-2xl leading-relaxed font-medium"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots - Inside center area near right edge */}
      <div className="absolute right-[calc(22%+1.5rem)] md:right-[calc(20%+1.5rem)] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-[calc(22%+1.5rem)] md:right-[calc(20%+1.5rem)] bottom-32 flex flex-col gap-3 z-30">
        <button
          onClick={() => paginate(-1)}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-white rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-28 left-[calc(22%+1.5rem)] md:left-[calc(20%+1.5rem)] text-white z-30">
        <span className="text-4xl font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="text-xl text-white/50 mx-2">/</span>
        <span className="text-xl text-white/50">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Horizontal Thumbnail Carousel - TikTok Style Cards */}
      <div className="absolute bottom-6 left-[22%] right-[22%] md:left-[20%] md:right-[20%] z-30 px-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={cn(
                'relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-lg overflow-hidden transition-all duration-300',
                index === currentIndex
                  ? 'ring-2 ring-white scale-105 shadow-lg'
                  : 'opacity-60 hover:opacity-100 hover:scale-102'
              )}
            >
              {slide.image ? (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              ) : slide.video ? (
                <video
                  src={slide.video}
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: slide.overlayColor || slideColors[index % slideColors.length] }}
                />
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Slide number */}
              <span className="absolute bottom-1 left-2 text-xs font-bold text-white">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Coming Soon Banner - Matching reference style */}
      <motion.div
        key={`banner-${currentIndex}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute top-24 left-[calc(22%+1.5rem)] md:left-[calc(20%+1.5rem)] z-30"
      >
        <div className="bg-white rounded-xl p-4 shadow-xl">
          <div className="text-xs text-gray-500 mb-1 font-medium">Coming Soon</div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-primary-500">02.21</span>
            <span className="px-3 py-1 rounded-lg text-sm font-bold bg-primary-500 text-white">SAT</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
