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

// Orange color for overlay and accents
const brandColor = 'oklch(0.65 0.2 45)';

export function VideoSlider({ slides, autoPlayInterval = 5000, className, dictionary, onColorChange }: VideoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const { setContentLoaded } = useLoading();

  // Get previous and next indices for side previews
  const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;

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

  // Render slide media (image or video)
  const renderMedia = (slide: Slide) => {
    if (slide.video) {
      return (
        <video
          src={slide.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    } else if (slide.image) {
      return (
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }
    return <div className="absolute inset-0 w-full h-full bg-gray-800" />;
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
    >
      {/* Left Side Panel - Adjacent slide with color overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-[18%] z-10 overflow-hidden">
        {/* Adjacent slide image */}
        <div className="absolute inset-0">
          {renderMedia(slides[prevIndex])}
          {/* Brand color overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: brandColor, opacity: 0.85 }}
          />
        </div>

        {/* Description text - positioned above bottom text */}
        <motion.div
          key={`desc-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-[35%] left-4 right-4 z-20"
        >
          <p className="text-sm md:text-base text-white/90 leading-relaxed">
            {dictionary?.description || slides[currentIndex].subtitle || 'شركة المرسال للإنتاج الإعلامي - نصنع المحتوى الإعلامي الذي يلهم ويؤثر. من الفكرة إلى التنفيذ، نحقق رؤيتك بأعلى جودة.'}
          </p>
        </motion.div>
      </div>

      {/* Right Side Panel - Adjacent slide with color overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-[18%] z-10 overflow-hidden">
        {/* Adjacent slide image */}
        <div className="absolute inset-0">
          {renderMedia(slides[nextIndex])}
          {/* Brand color overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: brandColor, opacity: 0.85 }}
          />
        </div>

        {/* Event Badge */}
        <motion.div
          key={`badge-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-[30%] left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary-600 flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white/20">
            <span className="text-[10px] md:text-xs font-medium opacity-90">
              {dictionary?.comingSoon || 'قريباً'}
            </span>
            <span className="text-2xl md:text-4xl font-black">02.21</span>
            <span className="text-xs md:text-sm font-bold">SAT</span>
            <span className="text-[8px] md:text-[10px] mt-1 opacity-70">MORE →</span>
          </div>
        </motion.div>
      </div>

      {/* Center Main Slider Area - Phone Mockup */}
      <div className="absolute top-[5%] bottom-[18%] left-[18%] right-[18%] z-20 flex items-center justify-center">
        {/* Phone Mockup Frame */}
        <div className="relative w-[280px] md:w-[320px] lg:w-[380px] h-[85%] max-h-[600px]">
          {/* Phone Frame Border */}
          <div className="absolute inset-0 bg-white/90 rounded-[40px] shadow-2xl" />

          {/* Phone Screen Area */}
          <div className="absolute inset-[8px] md:inset-[10px] rounded-[32px] overflow-hidden bg-black">
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
                {/* Background Media */}
                {renderMedia(slides[currentIndex])}

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phone Notch/Dynamic Island */}
          <div className="absolute top-[12px] md:top-[14px] left-1/2 -translate-x-1/2 w-[80px] md:w-[100px] h-[24px] md:h-[28px] bg-black rounded-full z-10" />
        </div>

        {/* Pagination Dots - Below phone */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          <span className="text-xs text-white/60 mr-3">Scroll Down</span>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Text Section - Large text at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[15%] z-30 flex">
        {/* Left Bottom Text */}
        <div className="w-[18%] flex flex-col justify-center items-center px-4">
          <motion.div
            key={`left-main-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none"
          >
            {slides[currentIndex].leftText?.main || 'الإبداع'}
          </motion.div>
          <motion.div
            key={`left-sub-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-black leading-none mt-2"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px white',
            }}
          >
            {slides[currentIndex].leftText?.sub || 'نصنعه'}
          </motion.div>
        </div>

        {/* Center Bottom - Empty spacer */}
        <div className="flex-1" />

        {/* Right Bottom Text */}
        <div className="w-[18%] flex flex-col justify-center items-center px-4">
          <motion.div
            key={`right-main-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none"
          >
            {slides[currentIndex].rightText?.main || 'الهوية'}
          </motion.div>
          <motion.div
            key={`right-sub-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-black leading-none mt-2"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1.5px white',
            }}
          >
            {slides[currentIndex].rightText?.sub || 'نحققها'}
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows - Next to phone mockup */}
      <div className="absolute left-[calc(18%+2rem)] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        <button
          onClick={() => paginate(-1)}
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4 text-white -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={() => paginate(1)}
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4 text-white rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
