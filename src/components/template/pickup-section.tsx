'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type PanInfo, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

const ORANGE = '#ED6C00';

interface PickupItem {
  id: string;
  color: string;
  title: string;
  subtitle?: string;
  tag?: string;
  date: string;
}

interface PickupSectionProps {
  dictionary?: {
    title?: string;
    subtitle?: string;
  };
  onColorChange?: (color: string) => void;
}

// Animation constants
// Center: 700 x 400, Small: 467 x 267
const SLIDE_WIDTH = 467;          // Small slide width
const CENTER_WIDTH = 700;         // Center slide width
const SLIDE_HEIGHT = 267;         // Small slide height
const CENTER_HEIGHT = 400;        // Center slide height
const SLIDE_GAP = 24;             // Gap between slides
const AUTO_PLAY_INTERVAL = 5000;  // 5 seconds
const DRAG_THRESHOLD = 50;        // Drag threshold for navigation
const BG_TRANSITION = 0.5;        // Background crossfade

// Spring configuration for smooth track movement
const springConfig = {
  stiffness: 300,
  damping: 40,
};

const pickupItems: PickupItem[] = [
  { id: '1', color: '#FFFFFF', title: 'رسالة للأهالي', tag: 'جديد', date: '2025.01.14' },
  { id: '2', color: '#FFFFFF', title: 'ورشة التصوير', tag: 'قريباً', date: '2025.01.20' },
  { id: '3', color: '#FFFFFF', title: 'نتائج المسابقة', tag: 'نتائج', date: '2025.01.10' },
  { id: '4', color: '#FFFFFF', title: 'دورة المونتاج', tag: 'تعليم', date: '2025.02.05' },
  { id: '5', color: '#FFFFFF', title: 'معرض الأعمال', tag: 'فعالية', date: '2025.02.15' },
  { id: '6', color: '#FFFFFF', title: 'خدماتنا الجديدة', tag: 'إعلان', date: '2025.02.20' },
];

// Individual slide component with smooth scaling using useTransform
interface PickupSlideItemProps {
  arrayIndex: number;
  slide: PickupItem;
  trackX: MotionValue<number>;
  windowWidth: number;
  hasAnimated: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
}

function PickupSlideItem({
  arrayIndex,
  slide,
  trackX,
  windowWidth,
  hasAnimated,
  onClickLeft,
  onClickRight,
}: PickupSlideItemProps) {
  const slidePosition = arrayIndex * (SLIDE_WIDTH + SLIDE_GAP);
  const screenCenter = windowWidth / 2;

  // Transition zone - area where scaling happens
  const transitionZone = (SLIDE_WIDTH + SLIDE_GAP) * 0.8;

  // Calculate width based on distance from center
  const width = useTransform(trackX, (x) => {
    const slideCenterX = slidePosition + SLIDE_WIDTH / 2 + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);

    // Outside transition zone = small size
    if (distanceFromCenter > transitionZone) {
      return SLIDE_WIDTH;
    }
    // Inside transition zone = interpolate to center size
    const t = 1 - (distanceFromCenter / transitionZone);
    return SLIDE_WIDTH + ((CENTER_WIDTH - SLIDE_WIDTH) * t);
  });

  // Calculate height based on distance from center
  const height = useTransform(trackX, (x) => {
    const slideCenterX = slidePosition + SLIDE_WIDTH / 2 + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);

    // Outside transition zone = small size
    if (distanceFromCenter > transitionZone) {
      return SLIDE_HEIGHT;
    }
    // Inside transition zone = interpolate to center size
    const t = 1 - (distanceFromCenter / transitionZone);
    return SLIDE_HEIGHT + ((CENTER_HEIGHT - SLIDE_HEIGHT) * t);
  });

  // Calculate opacity based on distance from center
  const opacity = useTransform(trackX, (x) => {
    const slideCenterX = slidePosition + SLIDE_WIDTH / 2 + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);
    const maxVisibleDistance = (SLIDE_WIDTH + SLIDE_GAP) * 3;

    if (distanceFromCenter > maxVisibleDistance) return 0;
    if (distanceFromCenter < maxVisibleDistance * 0.5) return 1;
    // Fade from 1 to 0.5 at edges
    const t = (distanceFromCenter - maxVisibleDistance * 0.5) / (maxVisibleDistance * 0.5);
    return 1 - (t * 0.5);
  });

  // Determine click direction
  const handleClick = useCallback(() => {
    const currentX = trackX.get();
    const slideCenterX = slidePosition + SLIDE_WIDTH / 2 + currentX;
    if (slideCenterX < screenCenter) {
      onClickLeft();
    } else if (slideCenterX > screenCenter) {
      onClickRight();
    }
  }, [trackX, slidePosition, screenCenter, onClickLeft, onClickRight]);

  return (
    <motion.div
      className="flex-shrink-0 cursor-pointer"
      style={{
        width,
        height,
        opacity: hasAnimated ? opacity : 1,
      }}
      onClick={handleClick}
    >
      <div
        className="w-full h-full"
        style={{ backgroundColor: slide.color }}
      />
    </motion.div>
  );
}

export function PickupSection({ dictionary, onColorChange }: PickupSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const lastColorRef = useRef<string | null>(null);

  const totalSlides = pickupItems.length;
  const centerArrayOffset = totalSlides; // Start in the middle copy for infinite scroll

  // Create extended slides array for infinite scroll (3 copies)
  const extendedSlides = [...pickupItems, ...pickupItems, ...pickupItems];

  // Motion value for track position
  const trackX = useMotionValue(0);
  const smoothTrackX = useSpring(trackX, springConfig);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll to change parent color to orange when hero exits viewport
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('[data-hero-section]');
      if (!heroSection || !onColorChange) return;

      const heroRect = heroSection.getBoundingClientRect();
      const heroBottom = heroRect.bottom;
      const viewportHeight = window.innerHeight;

      // When hero bottom goes above 50% of viewport, switch to orange
      const threshold = viewportHeight * 0.5;

      if (heroBottom < threshold) {
        // Hero has scrolled past - set to orange
        if (lastColorRef.current !== ORANGE) {
          onColorChange(ORANGE);
          lastColorRef.current = ORANGE;
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onColorChange]);

  // Calculate track offset to center a specific slide
  const getTrackOffset = useCallback((index: number) => {
    const screenCenter = windowWidth / 2;
    const targetSlideIndex = centerArrayOffset + index;

    // Position of target slide's left edge
    const position = targetSlideIndex * (SLIDE_WIDTH + SLIDE_GAP);

    // Center of the target slide (which will be at CENTER_WIDTH when centered)
    const slideCenter = position + CENTER_WIDTH / 2;

    return screenCenter - slideCenter;
  }, [windowWidth, centerArrayOffset]);

  // Initialize position
  useEffect(() => {
    const initialOffset = getTrackOffset(0);
    trackX.set(initialOffset);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsReady(true);
      setHasAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [getTrackOffset, trackX]);

  // Animate to specific index
  const animateToIndex = useCallback((newIndex: number) => {
    if (!isReady || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    // Update display index for UI immediately
    const actualNewIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
    setDisplayIndex(actualNewIndex);

    const newOffset = getTrackOffset(newIndex);
    trackX.set(newOffset);

    // Complete animation after spring settles
    setTimeout(() => {
      isAnimatingRef.current = false;

      // Seamless infinite loop reset
      let resetIndex = newIndex;
      if (newIndex >= totalSlides) {
        resetIndex = newIndex % totalSlides;
      } else if (newIndex < 0) {
        resetIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
      }

      // Only reset if we went outside the middle array
      if (resetIndex !== newIndex) {
        const resetOffset = getTrackOffset(resetIndex);
        trackX.jump(resetOffset);
        smoothTrackX.jump(resetOffset);
      }
      setCurrentIndex(resetIndex);
    }, 600);
  }, [isReady, getTrackOffset, totalSlides, trackX, smoothTrackX]);

  // Paginate by direction
  const paginate = useCallback((direction: number) => {
    if (!isReady || isAnimatingRef.current) return;
    animateToIndex(currentIndex + direction);
  }, [isReady, currentIndex, animateToIndex]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (!isReady || isAnimatingRef.current) return;
    const actualCurrentIndex = currentIndex % totalSlides;
    if (index === actualCurrentIndex) return;

    const targetIndex = currentIndex + (index - actualCurrentIndex);
    animateToIndex(targetIndex);
  }, [isReady, currentIndex, totalSlides, animateToIndex]);

  // Auto-play - shifts RIGHT
  useEffect(() => {
    if (!isReady || isPaused) return;

    autoPlayRef.current = setInterval(() => paginate(1), AUTO_PLAY_INTERVAL);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isReady, isPaused, paginate]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Drag end handler
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isReady) return;

    const { offset } = info;
    if (offset.x < -DRAG_THRESHOLD) {
      paginate(1);
    } else if (offset.x > DRAG_THRESHOLD) {
      paginate(-1);
    } else {
      // Snap back to current position
      const currentOffset = getTrackOffset(currentIndex);
      trackX.set(currentOffset);
    }
  };

  const currentSlide = pickupItems[displayIndex];

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-96 overflow-hidden flex flex-col items-center justify-center min-h-screen"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Layer - 1000px × h-screen centered */}
      <div className="absolute inset-0 z-[-5] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: BG_TRANSITION }}
            className="relative w-[1000px] h-screen"
            style={{ backgroundColor: currentSlide?.color }}
          />
        </AnimatePresence>
      </div>

      {/* Content Layer - centered on bg, no bottom padding */}
      <div className="absolute top-0 left-0 right-0 h-screen z-10 flex flex-col items-center justify-center">
        {/* Section Title - Simple centered */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider">
            PICK UP
          </h2>
        </div>

        {/* Photo Slider Track - centered within bg */}
        <div className="relative overflow-hidden w-full max-w-[1000px]">
          <motion.div
            className="flex items-center will-change-transform"
            style={{
              x: smoothTrackX,
              gap: `${SLIDE_GAP}px`,
              direction: 'ltr'
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
          >
            {extendedSlides.map((slide, arrayIndex) => (
              <PickupSlideItem
                key={`slide-${arrayIndex}`}
                arrayIndex={arrayIndex}
                slide={slide}
                trackX={smoothTrackX}
                windowWidth={windowWidth}
                hasAnimated={hasAnimated}
                onClickLeft={() => paginate(-1)}
                onClickRight={() => paginate(1)}
              />
            ))}
          </motion.div>
        </div>

        {/* Navigation - Simple dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {pickupItems.map((_, index) => {
            const isActive = index === displayIndex;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  isActive ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
