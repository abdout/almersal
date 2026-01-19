'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type PanInfo, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  overlayColor: string;
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
  { id: '1', overlayColor: '#ED6C00' },  // Orange
  { id: '2', overlayColor: '#2639A6' },  // Blue
  { id: '3', overlayColor: '#CC2525' },  // Red
  { id: '4', overlayColor: '#139A39' },  // Green
  { id: '5', overlayColor: '#FFD900' },  // Yellow
  { id: '6', overlayColor: '#139A39' },  // Green (repeat)
];

// Spring configuration for smooth track movement
const springConfig = {
  stiffness: 150,
  damping: 25,
};

// Individual slide component with smooth scaling
interface SlideItemProps {
  arrayIndex: number;
  trackX: MotionValue<number>;
  windowWidth: number;
  onClickLeft: () => void;
  onClickRight: () => void;
}

function SlideItem({
  arrayIndex,
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
  const transitionZone = (smallSlideWidth + SLIDE_GAP) * 1.2;

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
      className="relative flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
      style={{
        width,
        height,
      }}
      onClick={handleClick}
    >
      {/* White placeholder div */}
      <div className="w-full h-full bg-white" />
    </motion.div>
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
          {extendedSlides.map((_, arrayIndex) => (
            <SlideItem
              key={`slide-${arrayIndex}`}
              arrayIndex={arrayIndex}
              trackX={smoothTrackX}
              windowWidth={windowWidth}
              onClickLeft={() => paginate(-1)}
              onClickRight={() => paginate(1)}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Navigation with Timer Progress */}
      <div className="absolute left-0 right-0 z-30" style={{ bottom: '16%' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {slides.map((_, index) => {
              const isActive = index === displayIndex;
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'relative transition-all duration-300',
                    isActive ? 'w-6 h-6' : 'w-2 h-2'
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-white/40 hover:bg-white/60 transition-colors" />
                  )}

                  {isActive && (
                    <>
                      <svg
                        className="absolute inset-0 w-full h-full -rotate-90"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1.5"
                        />
                        {phase === 'ready' && (
                          <circle
                            key={`timer-circle-${displayIndex}`}
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 10}
                            strokeDashoffset={2 * Math.PI * 10}
                            className="timer-circle-progress"
                            style={{
                              '--timer-duration': `${autoPlayInterval}ms`,
                            } as React.CSSProperties}
                          />
                        )}
                        {phase === 'sliding' && (
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeDasharray={2 * Math.PI * 10}
                            strokeDashoffset="0"
                          />
                        )}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-[1px]" />
                      </div>
                    </>
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
