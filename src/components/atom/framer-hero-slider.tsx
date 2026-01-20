'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type PanInfo, type MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLoading } from '@/components/template/loading-context';
import { EventBadge } from '@/components/atom/event-badge';

interface Slide {
  id: string;
  overlayColor: string;
}

interface FramerHeroSliderProps {
  slides?: Slide[];
  autoPlayInterval?: number;
  className?: string;
  locale?: 'ar' | 'en';
  dictionary?: {
    description?: string;
    visionStatement?: string;
    leftPanel?: string;
    rightPanel?: string;
    comingSoon?: string;
    scrollDown?: string;
  };
  onColorChange?: (color: string) => void;
}

type AnimationPhase = 'initial' | 'entering' | 'focusing' | 'ready' | 'sliding';

// Constants for slide dimensions
const DRAG_THRESHOLD = 50;
const SCALE_MIN = 0.95;
const SCALE_MAX = 1.18;

// Responsive dimensions based on screen width
const getResponsiveDimensions = (width: number) => {
  if (width < 640) return { slideWidth: 140, slideGap: 12, baseHeight: 320 };
  if (width < 768) return { slideWidth: 200, slideGap: 20, baseHeight: 400 };
  if (width < 1024) return { slideWidth: 260, slideGap: 30, baseHeight: 480 };
  return { slideWidth: 310, slideGap: 40, baseHeight: 542 };
};

// Default placeholder slides with overlay colors
const placeholderSlides: Slide[] = [
  { id: '1', overlayColor: '#ED6C00' },  // Orange
  { id: '2', overlayColor: '#2639A6' },  // Blue
  { id: '3', overlayColor: '#CC2525' },  // Red
  { id: '4', overlayColor: '#139A39' },  // Green
  { id: '5', overlayColor: '#FFD900' },  // Yellow
  { id: '6', overlayColor: '#139A39' },  // Green (repeat)
  { id: '7', overlayColor: '#2639A6' },  // Blue (repeat)
];

// Spring configuration for smooth track movement
const springConfig = {
  stiffness: 300,
  damping: 40,
};

// Individual slide component with smooth scaling
interface SlideItemProps {
  arrayIndex: number;
  slide: Slide;
  trackX: MotionValue<number>;
  windowWidth: number;
  hasAnimated: boolean;
  currentSlideColor: string;
  onClickLeft: () => void;
  onClickRight: () => void;
  slideWidth: number;
  slideGap: number;
  baseHeight: number;
}

function SlideItem({
  arrayIndex,
  slide,
  trackX,
  windowWidth,
  hasAnimated,
  currentSlideColor,
  onClickLeft,
  onClickRight,
  slideWidth,
  slideGap,
  baseHeight,
}: SlideItemProps) {
  const smallSlideWidth = slideWidth * SCALE_MIN;
  const slidePosition = arrayIndex * (smallSlideWidth + slideGap);
  const screenCenter = windowWidth / 2;

  const transitionZone = (smallSlideWidth + slideGap) * 0.6; // Zone where scaling happens

  // Calculate width - only scale when entering/leaving center
  const width = useTransform(trackX, (x) => {
    const slideCenterX = slidePosition + smallSlideWidth / 2 + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);

    // Outside transition zone = small size
    if (distanceFromCenter > transitionZone) {
      return smallSlideWidth;
    }
    // Inside transition zone = interpolate
    const t = 1 - (distanceFromCenter / transitionZone);
    return smallSlideWidth + (slideWidth * (SCALE_MAX - SCALE_MIN) * t);
  });

  // Calculate height - only scale when entering/leaving center
  const height = useTransform(trackX, (x) => {
    const slideCenterX = slidePosition + smallSlideWidth / 2 + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);

    // Outside transition zone = small size
    if (distanceFromCenter > transitionZone) {
      return baseHeight * SCALE_MIN;
    }
    // Inside transition zone = interpolate
    const t = 1 - (distanceFromCenter / transitionZone);
    return baseHeight * SCALE_MIN + (baseHeight * (SCALE_MAX - SCALE_MIN) * t);
  });

  // Calculate opacity based on distance
  const opacity = useTransform(trackX, (x) => {
    const slideCenterX = slidePosition + smallSlideWidth / 2 + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);
    const maxVisibleDistance = (smallSlideWidth + slideGap) * 3;

    if (distanceFromCenter > maxVisibleDistance) return 0;
    if (distanceFromCenter < maxVisibleDistance * 0.7) return 1;
    return 1 - ((distanceFromCenter - maxVisibleDistance * 0.7) / (maxVisibleDistance * 0.3));
  });

  // Calculate overlay opacity (inverse of being center)
  const overlayOpacity = useTransform(trackX, (x) => {
    if (!hasAnimated) return 0;
    const slideCenterX = slidePosition + smallSlideWidth / 2 + x;
    const distanceFromCenter = Math.abs(slideCenterX - screenCenter);

    // Fully visible overlay outside transition zone
    if (distanceFromCenter > transitionZone) return 0.95;
    // No overlay at center
    if (distanceFromCenter < transitionZone * 0.3) return 0;
    // Transition zone
    const t = (distanceFromCenter - transitionZone * 0.3) / (transitionZone * 0.7);
    return t * 0.95;
  });

  // Determine click direction
  const handleClick = useCallback(() => {
    const currentX = trackX.get();
    const slideCenterX = slidePosition + slideWidth / 2 + currentX;
    if (slideCenterX < screenCenter) {
      onClickLeft();
    } else if (slideCenterX > screenCenter) {
      onClickRight();
    }
  }, [trackX, slidePosition, slideWidth, screenCenter, onClickLeft, onClickRight]);

  return (
    <motion.div
      className="relative flex-shrink-0 rounded-[28px] overflow-hidden"
      style={{
        width,
        height,
        opacity: hasAnimated ? opacity : 1,
      }}
      onClick={handleClick}
    >
      {/* White placeholder div */}
      <div className="w-full h-full bg-white" />

      {/* Color overlay - fades in as slide moves away from center */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: currentSlideColor,
          opacity: overlayOpacity,
        }}
      />
    </motion.div>
  );
}

export function FramerHeroSlider({
  slides = placeholderSlides,
  autoPlayInterval = 6000,
  className,
  locale = 'ar',
  dictionary,
  onColorChange,
}: FramerHeroSliderProps) {
  const fontFamily = locale === 'en' ? 'var(--font-geist-sans)' : 'var(--font-rubik)';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  // Custom cursor state
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorDirection, setCursorDirection] = useState<'left' | 'right'>('right');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Get responsive dimensions
  const { slideWidth, slideGap, baseHeight } = useMemo(
    () => getResponsiveDimensions(windowWidth),
    [windowWidth]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  const { setContentLoaded } = useLoading();

  // Create extended slides array for infinite scroll
  const extendedSlides = [...slides, ...slides, ...slides];
  const centerArrayOffset = slides.length; // Start in the middle copy

  // Motion value for track position
  const trackX = useMotionValue(0);
  const smoothTrackX = useSpring(trackX, springConfig);

  // Update window width on resize and detect touch device
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate track offset to center a specific slide
  const getTrackOffset = useCallback((index: number) => {
    const screenCenter = windowWidth / 2;
    const targetSlideIndex = centerArrayOffset + index;

    // When this slide is centered, all OTHER slides are at SCALE_MIN
    const smallSlideWidth = slideWidth * SCALE_MIN;
    const centerSlideWidth = slideWidth * SCALE_MAX;

    // Position of target slide's left edge (all slides before it are small)
    const position = targetSlideIndex * (smallSlideWidth + slideGap);

    // Center of the target slide (which will be at SCALE_MAX)
    const slideCenter = position + centerSlideWidth / 2;

    return screenCenter - slideCenter;
  }, [windowWidth, centerArrayOffset, slideWidth, slideGap]);

  // Initialize position and trigger entry animation
  useEffect(() => {
    const initialOffset = getTrackOffset(0);
    trackX.set(initialOffset);

    // Mark content loaded for loading screen
    setContentLoaded();

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
  }, [getTrackOffset, setContentLoaded, trackX]);

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

  // Custom cursor handlers
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setCursorDirection(e.clientX < windowWidth / 2 ? 'left' : 'right');
  }, [windowWidth]);

  const handleMouseEnter = useCallback(() => {
    setCursorVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorVisible(false);
  }, []);

  const handleCursorClick = useCallback(() => {
    if (phase !== 'ready' || isAnimatingRef.current) return;
    paginate(cursorDirection === 'left' ? -1 : 1);
  }, [phase, paginate, cursorDirection]);

  const currentSlide = slides[displayIndex];

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-screen overflow-hidden', className)}
    >
      {/* Slider Track Area - custom cursor zone */}
      <div
        className={cn(
          'absolute inset-x-0 top-[15%] bottom-[20%] z-10 overflow-hidden',
          !isTouchDevice && 'cursor-none'
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCursorClick}
      >
        {/* Custom Cursor - hidden on touch devices */}
        {cursorVisible && !isTouchDevice && (
          <div
            className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
            }}
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: currentSlide?.overlayColor || '#ED6C00' }}
                className={cursorDirection === 'left' ? 'rotate-180' : ''}
              >
                <path
                  d="M7 12h10m0 0l-5-5m5 5l-5 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Slider Track */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="flex items-center pb-[8vh] sm:pb-[10vh] md:pb-[15vh] h-full will-change-transform pointer-events-auto"
          style={{
            x: smoothTrackX,
            gap: `${slideGap}px`,
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
              hasAnimated={hasAnimated}
              currentSlideColor={currentSlide?.overlayColor || '#ED6C00'}
              onClickLeft={() => paginate(-1)}
              onClickRight={() => paginate(1)}
              slideWidth={slideWidth}
              slideGap={slideGap}
              baseHeight={baseHeight}
            />
          ))}
        </motion.div>
      </div>

      {/* Left Panel - hidden on mobile/tablet */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[28%] z-20 hidden md:flex flex-col justify-between pt-[20vh] pb-8 px-8 md:px-12 lg:px-16 pointer-events-none"
        style={{ fontFamily }}
      >
        <div className="text-start max-w-[320px]">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-snug drop-shadow-lg">
            {dictionary?.visionStatement || 'We craft innovative media content that reflects our clients\' identity and reaches the hearts of audiences'}
          </p>
        </div>
        <div>
          {(() => {
            const lines = (dictionary?.leftPanel || 'Fuel\nCreativity').split('\n');
            return (
              <div className="text-white drop-shadow-lg text-start">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                  {lines[0]}
                </div>
                {lines[1] && (
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                    {lines[1]}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Right Panel - hidden on mobile/tablet */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[20%] z-20 hidden md:flex flex-col items-end justify-between pt-[10vh] pb-8 pr-8 md:pr-12 lg:pr-16 pl-4 pointer-events-none"
        style={{ fontFamily }}
      >
        <div className="pointer-events-auto cursor-auto">
          <EventBadge heroColor={currentSlide?.overlayColor} />
        </div>
        <div>
          {(() => {
            const lines = (dictionary?.rightPanel || 'Shape\nIdentity').split('\n');
            return (
              <div className="text-white drop-shadow-lg text-end">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                  {lines[0]}
                </div>
                {lines[1] && (
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                    {lines[1]}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Bottom Navigation with Timer Progress */}
      <div className="absolute left-0 right-0 z-30 pointer-events-auto cursor-auto bottom-[10%] sm:bottom-[12%] md:bottom-[16%]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {slides.map((_, index) => {
              const isActive = index === displayIndex;
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(index);
                  }}
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

      {/* Scroll Down Caption */}
      <div
        className={cn(
          'absolute left-1/2 -translate-x-1/2 z-30 transition-all duration-500 flex flex-col items-center gap-2 bottom-[5%] sm:bottom-[4%] md:bottom-[3%]',
          phase === 'ready' || phase === 'sliding' ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Text scroll container */}
        <div className="h-4 overflow-hidden">
          <div className="animate-scroll-down">
            <span className="block text-xs text-white/90 font-medium tracking-wide drop-shadow-lg h-4">
              {dictionary?.scrollDown || 'Scroll Down'}
            </span>
            <span className="block text-xs text-white/90 font-medium tracking-wide drop-shadow-lg h-4">
              {dictionary?.scrollDown || 'Scroll Down'}
            </span>
          </div>
        </div>
        {/* Arrow scroll container */}
        <div className="h-4 overflow-hidden">
          <div className="animate-scroll-down">
            <div className="h-4 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/80"
              >
                <path
                  d="M12 4v16m0 0l-6-6m6 6l6-6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="h-4 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/80"
              >
                <path
                  d="M12 4v16m0 0l-6-6m6 6l6-6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
