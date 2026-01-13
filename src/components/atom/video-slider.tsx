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
}

interface VideoSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
  className?: string;
}

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

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
    >
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

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            >
              {slides[currentIndex].title}
            </motion.h2>
            {slides[currentIndex].subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl md:text-2xl text-white/80 max-w-2xl"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentIndex
                ? 'bg-primary-500 scale-125'
                : 'bg-white/50 hover:bg-white/80'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide number indicator */}
      <div className="absolute bottom-8 left-8 text-white z-10">
        <span className="text-4xl font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="text-xl text-white/50 mx-2">/</span>
        <span className="text-xl text-white/50">{String(slides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
