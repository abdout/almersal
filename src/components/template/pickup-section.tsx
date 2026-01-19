'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
gsap.registerPlugin(useGSAP);

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
// Center: 700 x 400, Small: 467 x 267 (700/1.5 x 400/1.5)
const SLIDE_WIDTH = 467;          // Base slide width (desktop)
const SLIDE_WIDTH_TABLET = 350;   // Tablet
const SLIDE_WIDTH_MOBILE = 280;   // Mobile
const SLIDE_HEIGHT = 267;         // Base slide height
const CENTER_WIDTH = 700;         // Center slide width
const CENTER_HEIGHT = 400;        // Center slide height
const SLIDE_GAP = 24;             // Gap between slides
const CENTER_SCALE = CENTER_WIDTH / SLIDE_WIDTH; // ~1.5x
const AUTO_PLAY_INTERVAL = 5000;  // 5 seconds
const TRANSITION_DURATION = 0.7;  // Slide transition
const BG_TRANSITION = 0.5;        // Background crossfade
const MIN_SCALE = 1;              // Edge slides at normal scale
const INTERPOLATION_RANGE = 1.2;  // Distance over which interpolation happens

// Linear interpolation helper
const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * Math.max(0, Math.min(1, t));
};

const pickupItems: PickupItem[] = [
  { id: '1', color: '#FFFFFF', title: 'رسالة للأهالي', tag: 'جديد', date: '2025.01.14' },
  { id: '2', color: '#FFFFFF', title: 'ورشة التصوير', tag: 'قريباً', date: '2025.01.20' },
  { id: '3', color: '#FFFFFF', title: 'نتائج المسابقة', tag: 'نتائج', date: '2025.01.10' },
  { id: '4', color: '#FFFFFF', title: 'دورة المونتاج', tag: 'تعليم', date: '2025.02.05' },
  { id: '5', color: '#FFFFFF', title: 'معرض الأعمال', tag: 'فعالية', date: '2025.02.15' },
  { id: '6', color: '#FFFFFF', title: 'خدماتنا الجديدة', tag: 'إعلان', date: '2025.02.20' },
];

export function PickupSection({ dictionary, onColorChange }: PickupSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [slideWidth, setSlideWidth] = useState(SLIDE_WIDTH);
  const [, setAnimationTick] = useState(0); // Force re-render during animation
  const lastColorRef = useRef<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const trackPositionRef = useRef(0);

  const totalSlides = pickupItems.length;
  const centerOffset = totalSlides; // Start in middle copy for infinite scroll

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

  // Create extended slides array for infinite scroll (3 copies)
  const extendedSlides = useCallback(() => {
    return [...pickupItems, ...pickupItems, ...pickupItems];
  }, []);

  // Handle responsive slide width
  useEffect(() => {
    const updateSlideWidth = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlideWidth(SLIDE_WIDTH_MOBILE);
      } else if (width < 1024) {
        setSlideWidth(SLIDE_WIDTH_TABLET);
      } else {
        setSlideWidth(SLIDE_WIDTH);
      }
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  // Calculate track position for a given index
  const getTrackPosition = useCallback((index: number) => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const slides = trackRef.current.children;
      const targetSlideIndex = centerOffset + index;

      if (targetSlideIndex >= 0 && targetSlideIndex < slides.length) {
        const targetSlide = slides[targetSlideIndex] as HTMLElement;
        const containerCenter = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
        const slideCenterInTrack = targetSlide.offsetLeft + targetSlide.offsetWidth / 2;
        return containerCenter - slideCenterInTrack;
      }
    }

    // Fallback calculation
    const slideUnit = slideWidth + SLIDE_GAP;
    const targetPosition = (centerOffset + index) * slideUnit;
    const containerCenter = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    return containerCenter - targetPosition - slideWidth / 2;
  }, [centerOffset, slideWidth]);

  // Initial positioning
  useEffect(() => {
    if (trackRef.current) {
      const timer = setTimeout(() => {
        const initialPos = getTrackPosition(currentIndex);
        trackPositionRef.current = initialPos;
        gsap.set(trackRef.current, { x: initialPos });
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [getTrackPosition, currentIndex]);

  // Animate to a new index
  const animateToIndex = useCallback((newIndex: number, direction: number) => {
    if (!trackRef.current || !isReady || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const newPos = getTrackPosition(newIndex);

    gsap.to(trackRef.current, {
      x: newPos,
      duration: TRANSITION_DURATION,
      ease: 'power2.inOut',
      onUpdate: () => {
        // Update track position ref for style calculations
        trackPositionRef.current = gsap.getProperty(trackRef.current, 'x') as number;
        // Force re-render to update slide styles during animation
        setAnimationTick((tick) => tick + 1);
      },
      onComplete: () => {
        trackPositionRef.current = newPos;
        setCurrentIndex(newIndex);
        isAnimatingRef.current = false;

        // Handle infinite scroll reset
        if (newIndex >= totalSlides) {
          const resetIndex = newIndex % totalSlides;
          const resetPos = getTrackPosition(resetIndex);
          gsap.set(trackRef.current, { x: resetPos });
          trackPositionRef.current = resetPos;
          setCurrentIndex(resetIndex);
        } else if (newIndex < 0) {
          const resetIndex = totalSlides + (newIndex % totalSlides);
          const resetPos = getTrackPosition(resetIndex);
          gsap.set(trackRef.current, { x: resetPos });
          trackPositionRef.current = resetPos;
          setCurrentIndex(resetIndex);
        }
      },
    });

    // Update display index immediately for UI
    const actualNewIndex = ((newIndex % totalSlides) + totalSlides) % totalSlides;
    setDisplayIndex(actualNewIndex);
  }, [isReady, getTrackPosition, totalSlides]);

  // Navigation functions
  const paginate = useCallback((direction: number) => {
    if (!isReady || isAnimatingRef.current) return;
    const newIndex = currentIndex + direction;
    animateToIndex(newIndex, direction);
  }, [isReady, currentIndex, animateToIndex]);

  const goToSlide = useCallback((index: number) => {
    if (!isReady || isAnimatingRef.current) return;
    const actualCurrentIndex = currentIndex % totalSlides;
    if (index === actualCurrentIndex) return;

    const direction = index > actualCurrentIndex ? 1 : -1;
    const targetIndex = currentIndex + (index - actualCurrentIndex);
    animateToIndex(targetIndex, direction);
  }, [isReady, currentIndex, totalSlides, animateToIndex]);

  // Auto-play - shifts RIGHT
  useEffect(() => {
    if (!isReady) return;

    autoPlayRef.current = setInterval(() => {
      paginate(1); // Shift right
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isReady, paginate]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isReady && !autoPlayRef.current) {
      autoPlayRef.current = setInterval(() => paginate(1), AUTO_PLAY_INTERVAL);
    }
  };

  const allSlides = extendedSlides();
  const currentSlide = pickupItems[displayIndex];

  // Get styles for each slide based on actual pixel distance from viewport center
  const getSlideStyles = useCallback((slideArrayIndex: number): React.CSSProperties => {
    const slideElement = slideRefs.current[slideArrayIndex];
    const viewportCenter = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;

    // Calculate pixel distance from viewport center
    let pixelDistanceFromCenter: number;

    if (slideElement && trackRef.current) {
      // Get current track position from GSAP or ref
      const trackX = trackPositionRef.current;
      // Calculate slide center in viewport coordinates
      const slideLeftInTrack = slideElement.offsetLeft;
      const slideCenter = slideLeftInTrack + slideElement.offsetWidth / 2 + trackX;
      pixelDistanceFromCenter = Math.abs(slideCenter - viewportCenter);
    } else {
      // Fallback: calculate based on array index
      const relativeToCenter = slideArrayIndex - (centerOffset + currentIndex);
      pixelDistanceFromCenter = Math.abs(relativeToCenter) * (slideWidth + SLIDE_GAP);
    }

    // Normalize distance: 0 = at center, 1 = one slide unit away
    const slideUnit = slideWidth + SLIDE_GAP;
    const normalizedDistance = pixelDistanceFromCenter / slideUnit;

    // Clamp interpolation factor (0 = center, 1 = edge/beyond)
    const t = Math.min(normalizedDistance / INTERPOLATION_RANGE, 1);

    // Interpolate all properties smoothly
    const scale = lerp(CENTER_SCALE, 1, t);
    const width = slideWidth * scale;

    // Height interpolation - center: 400px, small: 267px
    const height = lerp(CENTER_HEIGHT, SLIDE_HEIGHT, t);

    // Opacity: center = 1, edges = 0.5
    const opacity = lerp(1, 0.5, Math.min(normalizedDistance / 2.5, 1));

    // Transform scale - subtle, mostly rely on width/height
    const transformScale = lerp(1.02, MIN_SCALE, t);

    // Z-index based on distance
    const zIndex = Math.max(1, Math.round(10 - normalizedDistance));

    return {
      width: `${width}px`,
      height: `${height}px`,
      opacity: isReady ? opacity : (normalizedDistance <= 3 ? 1 : 0),
      transform: `scale(${transformScale})`,
      zIndex,
    };
  }, [centerOffset, currentIndex, slideWidth, isReady]);

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
          <div
            ref={trackRef}
            className="flex items-center will-change-transform"
            style={{ gap: `${SLIDE_GAP}px`, direction: 'ltr' }}
          >
            {allSlides.map((slide, arrayIndex) => {
              const relativeToCenter = arrayIndex - (centerOffset + currentIndex);
              const styles = getSlideStyles(arrayIndex);

              return (
                <div
                  key={`slide-${arrayIndex}`}
                  ref={(el) => { slideRefs.current[arrayIndex] = el; }}
                  className="flex-shrink-0 cursor-pointer"
                  style={styles}
                  onClick={() => {
                    if (relativeToCenter < 0) paginate(relativeToCenter);
                    else if (relativeToCenter > 0) paginate(relativeToCenter);
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: slide.color }}
                  />
                </div>
              );
            })}
          </div>
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
