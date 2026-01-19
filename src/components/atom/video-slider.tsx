'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLoading } from '@/components/template/loading-context';
import { EventBadge } from '@/components/atom/event-badge';

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
  dictionary?: {
    cta?: {
      primary: string;
      secondary: string;
    };
    description?: string;
    comingSoon?: string;
    scrollDown?: string;
  };
  onColorChange?: (color: string) => void;
}

export function VideoSlider({
  slides,
  autoPlayInterval = 5000,
  className,
  dictionary,
  onColorChange,
}: VideoSliderProps) {
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
      img.onerror = () => setContentLoaded();
      img.src = firstSlide.image;
    } else if (firstSlide?.video) {
      const timeout = setTimeout(setContentLoaded, 500);
      return () => clearTimeout(timeout);
    } else {
      setContentLoaded();
    }
  }, [slides, setContentLoaded]);

  // Notify parent of color changes
  useEffect(() => {
    if (onColorChange && slides[currentIndex]?.overlayColor) {
      onColorChange(slides[currentIndex].overlayColor);
    }
  }, [currentIndex, slides, onColorChange]);

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

  // Horizontal drag handler for phone mockup
  const handleDragEnd = (_: never, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      paginate(1);
    } else if (info.offset.x > threshold) {
      paginate(-1);
    }
  };

  // Auto-play
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

  // Horizontal slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
    >
      {/* Left Panel - SOLID COLOR background */}
      <div className="absolute left-0 top-0 bottom-0 w-[18%] z-10 flex flex-col justify-between py-8 px-4 md:px-6">
        {/* Description text at top */}
        <motion.div
          key={`desc-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <p className="text-xs md:text-sm text-white/90 leading-relaxed">
            {dictionary?.description ||
              currentSlide.subtitle ||
              'شركة المرسال للإنتاج الإعلامي - نصنع المحتوى الإعلامي الذي يلهم ويؤثر.'}
          </p>
        </motion.div>

        {/* Left Bottom Text */}
        <div>
          <motion.div
            key={`left-main-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none"
          >
            {currentSlide.leftText?.main || 'الإبداع'}
          </motion.div>
          <motion.div
            key={`left-sub-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl font-black leading-none mt-2"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px white',
            }}
          >
            {currentSlide.leftText?.sub || 'نصنعه'}
          </motion.div>
        </div>
      </div>

      {/* Center - Phone Mockup Frame */}
      <div className="absolute top-[8%] bottom-[15%] left-[18%] right-[18%] z-20 flex items-center justify-center">
        {/* Phone Frame */}
        <div className="relative w-[280px] md:w-[320px] lg:w-[380px] h-[85%] max-h-[550px]">
          {/* Phone Border */}
          <div className="absolute inset-0 bg-white/90 rounded-[40px] shadow-2xl" />

          {/* Phone Screen */}
          <div className="absolute inset-[8px] md:inset-[10px] rounded-[32px] overflow-hidden bg-black">
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
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              >
                {/* Image */}
                {currentSlide.video ? (
                  <video
                    src={currentSlide.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone Notch/Dynamic Island */}
          <div className="absolute top-[12px] md:top-[14px] left-1/2 -translate-x-1/2 w-[80px] md:w-[100px] h-[24px] md:h-[28px] bg-black rounded-full z-10" />
        </div>
      </div>

      {/* Right Panel - SOLID COLOR background */}
      <div className="absolute right-0 top-0 bottom-0 w-[18%] z-10 flex flex-col items-center justify-between py-8 px-4">
        {/* Event Badge */}
        <motion.div
          key={`badge-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="mt-16"
        >
          <EventBadge />
        </motion.div>

        {/* Right Bottom Text */}
        <div className="text-center">
          <motion.div
            key={`right-main-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none"
          >
            {currentSlide.rightText?.main || 'الهوية'}
          </motion.div>
          <motion.div
            key={`right-sub-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl font-black leading-none mt-2"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px white',
            }}
          >
            {currentSlide.rightText?.sub || 'نحققها'}
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-[5%] left-0 right-0 z-30">
        <div className="flex flex-col items-center gap-3">
          {/* Scroll indicator */}
          <span className="text-xs text-white/60">
            {dictionary?.scrollDown || 'Scroll Down'}
          </span>

          {/* Dots Navigation */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/60'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
