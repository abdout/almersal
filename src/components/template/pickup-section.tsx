'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type PanInfo, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  overlayColor: string;
  title: string;
  date: string;
}

interface PickupSectionProps {
  slides?: Slide[];
  autoPlayInterval?: number;
  className?: string;
  dictionary?: {
    title?: string;
    subtitle?: string;
  };
  onColorChange?: (color: string) => void;
}

type AnimationPhase = 'initial' | 'entering' | 'focusing' | 'ready' | 'sliding';

// Constants for slide dimensions
const SLIDE_WIDTH = 300;
const SLIDE_GAP = 40;
const DRAG_THRESHOLD = 50;
const SCALE_MIN = 1.0;
const SCALE_MAX = 2.4;
const HEIGHT_SCALE_MAX = 2.4;

// Default placeholder slides with overlay colors (6 slides)
const placeholderSlides: Slide[] = [
  { id: '1', overlayColor: '#ED6C00', title: 'Message to Parents', date: '2025.01.14' },
  { id: '2', overlayColor: '#2639A6', title: 'Photography Workshop', date: '2025.01.20' },
  { id: '3', overlayColor: '#CC2525', title: 'Competition Results', date: '2025.01.10' },
  { id: '4', overlayColor: '#139A39', title: 'Editing Course', date: '2025.02.05' },
  { id: '5', overlayColor: '#FFD900', title: 'Work Exhibition', date: '2025.02.15' },
  { id: '6', overlayColor: '#139A39', title: 'New Services', date: '2025.02.20' },
];

// Spring configuration for smooth track movement
const springConfig = {
  stiffness: 120,
  damping: 20,
};

// Individual slide component with smooth scaling
interface SlideItemProps {
  arrayIndex: number;
  slide: Slide;
  trackX: MotionValue<number>;
  windowWidth: number;
  onClickLeft: () => void;
  onClickRight: () => void;
}

function SlideItem({
  arrayIndex,
  slide,
  trackX,
  windowWidth,
  onClickLeft,
  onClickRight,
}: SlideItemProps) {
  const smallSlideWidth = SLIDE_WIDTH * SCALE_MIN;
  const centerSlideWidth = SLIDE_WIDTH * SCALE_MAX;
  const slidePosition = arrayIndex * (smallSlideWidth + SLIDE_GAP);
  const screenCenter = windowWidth / 2;

  const baseHeight = 200;
  const transitionZone = (smallSlideWidth + SLIDE_GAP) * 1.0;

  // Calculate width - only scale when entering/leaving center
  const width = useTransform(trackX, (x) => {
    // Use center of the big slide for distance calculation
    const widthGrowth = (centerSlideWidth - smallSlideWidth) / 2;
    const slideCenterX = slidePosition + smallSlideWidth / 2 + widthGrowth + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);

    if (distanceFromCenter > transitionZone) {
      return smallSlideWidth;
    }
    const t = 1 - (distanceFromCenter / transitionZone);
    return smallSlideWidth + (SLIDE_WIDTH * (SCALE_MAX - SCALE_MIN) * t);
  });

  // Calculate height - only scale when entering/leaving center
  const height = useTransform(trackX, (x) => {
    const widthGrowth = (centerSlideWidth - smallSlideWidth) / 2;
    const slideCenterX = slidePosition + smallSlideWidth / 2 + widthGrowth + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);

    if (distanceFromCenter > transitionZone) {
      return baseHeight * SCALE_MIN;
    }
    const t = 1 - (distanceFromCenter / transitionZone);
    return baseHeight * SCALE_MIN + (baseHeight * (HEIGHT_SCALE_MAX - SCALE_MIN) * t);
  });

  // Calculate text opacity - only show when close to center
  const textOpacity = useTransform(trackX, (x) => {
    const widthGrowth = (centerSlideWidth - smallSlideWidth) / 2;
    const slideCenterX = slidePosition + smallSlideWidth / 2 + widthGrowth + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);
    const fadeZone = transitionZone * 0.6;

    if (distanceFromCenter > fadeZone) return 0;
    return 1 - (distanceFromCenter / fadeZone);
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
    <div className="relative flex-shrink-0 flex flex-col items-center">
      {/* Date - above slide, aligned right */}
      <motion.div
        className="text-right mb-3"
        style={{ opacity: textOpacity, width }}
      >
        <span className="text-white/90 text-xl font-semibold">{slide.date}</span>
      </motion.div>

      {/* Slide */}
      <motion.div
        className="relative rounded-lg overflow-hidden cursor-pointer"
        style={{
          width,
          height,
        }}
        onClick={handleClick}
      >
        <div className="w-full h-full bg-white" />
      </motion.div>

      {/* Title - below slide, aligned left */}
      <motion.div
        className="text-left mt-3"
        style={{ opacity: textOpacity, width }}
      >
        <span className="text-white text-xl font-bold">{slide.title}</span>
      </motion.div>
    </div>
  );
}

export function PickupSection({
  slides = placeholderSlides,
  autoPlayInterval = 5000,
  className,
  dictionary,
  onColorChange,
}: PickupSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  // Create extended slides array for infinite scroll
  const extendedSlides = [...slides, ...slides, ...slides];
  const centerArrayOffset = slides.length; // Start in the middle copy

  // Motion value for track position
  const trackX = useMotionValue(0);
  const smoothTrackX = useSpring(trackX, springConfig);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate track offset to center a specific slide
  const getTrackOffset = useCallback((index: number) => {
    const screenCenter = windowWidth / 2;
    const targetSlideIndex = centerArrayOffset + index;

    const smallSlideWidth = SLIDE_WIDTH * SCALE_MIN;
    const centerSlideWidth = SLIDE_WIDTH * SCALE_MAX;

    // Position of target slide's left edge
    const position = targetSlideIndex * (smallSlideWidth + SLIDE_GAP);

    // Center the big slide on screen
    const slideCenter = position + centerSlideWidth / 2;

    return screenCenter - slideCenter;
  }, [windowWidth, centerArrayOffset]);

  // Initialize position and trigger entry animation
  useEffect(() => {
    const initialOffset = getTrackOffset(0);
    trackX.set(initialOffset);

    // Entry animation sequence
    const entryTimer = setTimeout(() => {
      setPhase('entering');
      setTimeout(() => {
        setPhase('focusing');
        setTimeout(() => {
          setPhase('ready');
          setHasAnimated(true);
        }, 800);
      }, 800);
    }, 300);

    return () => clearTimeout(entryTimer);
  }, [getTrackOffset, trackX]);

  // Notify parent of color changes
  useEffect(() => {
    if (onColorChange && slides[displayIndex]?.overlayColor) {
      onColorChange(slides[displayIndex].overlayColor);
    }
  }, [displayIndex, slides, onColorChange]);

  // Animate to specific index
  const animateToIndex = useCallback((newIndex: number) => {
    if (!hasAnimated || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setPhase('sliding');

    // Update display index for text/color immediately
    const actualNewIndex = ((newIndex % slides.length) + slides.length) % slides.length;
    setDisplayIndex(actualNewIndex);

    const newOffset = getTrackOffset(newIndex);
    trackX.set(newOffset);

    // Complete animation after spring settles
    setTimeout(() => {
      isAnimatingRef.current = false;
      setPhase('ready');

      // Seamless infinite loop reset
      // Keep index within middle array bounds for smooth looping
      let resetIndex = newIndex;
      if (newIndex >= slides.length) {
        resetIndex = newIndex % slides.length;
      } else if (newIndex < 0) {
        resetIndex = ((newIndex % slides.length) + slides.length) % slides.length;
      }

      // Only reset if we went outside the middle array
      if (resetIndex !== newIndex) {
        const resetOffset = getTrackOffset(resetIndex);
        trackX.jump(resetOffset);
        smoothTrackX.jump(resetOffset);
      }
      setCurrentIndex(resetIndex);
    }, 600);
  }, [hasAnimated, getTrackOffset, slides.length, trackX, smoothTrackX]);

  // Paginate by direction
  const paginate = useCallback((direction: number) => {
    if (phase !== 'ready' || isAnimatingRef.current) return;
    animateToIndex(currentIndex + direction);
  }, [phase, currentIndex, animateToIndex]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (phase !== 'ready' || isAnimatingRef.current) return;
    const actualCurrentIndex = currentIndex % slides.length;
    if (index === actualCurrentIndex) return;

    const targetIndex = currentIndex + (index - actualCurrentIndex);
    animateToIndex(targetIndex);
  }, [phase, currentIndex, slides.length, animateToIndex]);

  // Auto-play
  useEffect(() => {
    if (phase !== 'ready' || autoPlayInterval <= 0) return;

    autoPlayRef.current = setInterval(() => paginate(1), autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [phase, autoPlayInterval, paginate]);

  // Drag end handler
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (phase !== 'ready') return;

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

  const currentSlide = slides[displayIndex];

  return (
    <div ref={containerRef} className={cn('relative w-full h-[150vh] overflow-hidden', className)}>
      {/* Section Title - Top left corner of center div */}
      <div
        className="absolute z-20 left-1/2"
        style={{
          transform: `translateX(-${(SLIDE_WIDTH * SCALE_MAX) / 2 + 200}px)`,
          top: 'calc(50% - 380px)'
        }}
      >
        <h2 className="text-white text-8xl font-black tracking-wider">
          <span className="block">PICK</span>
          <span className="block">UP</span>
        </h2>
      </div>

      {/* Slider Track */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="flex items-center h-full will-change-transform"
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
            <SlideItem
              key={`slide-${arrayIndex}`}
              arrayIndex={arrayIndex}
              slide={slide}
              trackX={smoothTrackX}
              windowWidth={windowWidth}
              onClickLeft={() => paginate(-1)}
              onClickRight={() => paginate(1)}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation - Arrows left, Indicators right */}
      <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ bottom: '20%', width: `${SLIDE_WIDTH * SCALE_MAX}px` }}>
        <div className="flex items-center justify-between">
          {/* Left/Right Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              className="h-10 px-4 flex items-center justify-center bg-white text-orange-500 hover:text-orange-600 transition-colors rounded-l-lg"
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="h-10 px-4 flex items-center justify-center bg-white text-orange-500 hover:text-orange-600 transition-colors rounded-r-lg"
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => {
              const isActive = index === displayIndex;
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'relative transition-all duration-300 rounded-full bg-white',
                    isActive ? 'w-5 h-5' : 'w-2 h-2 hover:bg-white/80'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {isActive && (
                    <div className="absolute inset-1 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
