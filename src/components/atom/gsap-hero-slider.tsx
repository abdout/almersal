'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { useLoading } from '@/components/template/loading-context';
import { EventBadge } from '@/components/atom/event-badge';

gsap.registerPlugin(useGSAP);

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  leftText?: { main: string; sub: string };
  rightText?: { main: string; sub: string };
  overlayColor: string;
}

interface GSAPHeroSliderProps {
  slides: Slide[];
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

// Fixed slide width for consistent spacing
const SLIDE_WIDTH = 300; // Base width in pixels
const SLIDE_GAP = 36; // Gap between slides

export function GSAPHeroSlider({
  slides,
  autoPlayInterval = 6000,
  className,
  locale = 'ar',
  dictionary,
  onColorChange,
}: GSAPHeroSliderProps) {
  // Use Geist for English, Rubik for Arabic
  const fontFamily = locale === 'en' ? 'var(--font-geist-sans)' : 'var(--font-rubik)';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<AnimationPhase>('initial');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0); // For smooth text transitions

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const trackPositionRef = useRef(0);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const { setContentLoaded } = useLoading();

  // Create extended slides array for infinite scroll (duplicate slides on both sides)
  const extendedSlides = useCallback(() => {
    // Create 3 copies: [slides, slides, slides] for seamless infinite scroll
    return [...slides, ...slides, ...slides];
  }, [slides]);

  const totalExtendedSlides = slides.length * 3;
  const centerOffset = slides.length; // Start in the middle copy

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = slide.image;
        });
      });
      await Promise.all(imagePromises);
      setImagesLoaded(true);
      setContentLoaded();
    };
    preloadImages();
  }, [slides, setContentLoaded]);

  // Notify parent of color changes
  useEffect(() => {
    if (onColorChange && slides[displayIndex]?.overlayColor) {
      onColorChange(slides[displayIndex].overlayColor);
    }
  }, [displayIndex, slides, onColorChange]);

  // Calculate the track position for a given index
  const getTrackPosition = useCallback((index: number) => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      // Get actual slide positions from the DOM
      const slides = trackRef.current.children;
      const targetSlideIndex = centerOffset + index;

      if (targetSlideIndex >= 0 && targetSlideIndex < slides.length) {
        const targetSlide = slides[targetSlideIndex] as HTMLElement;
        const containerCenter = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;

        // Current slide center relative to track
        const slideCenterInTrack = targetSlide.offsetLeft + targetSlide.offsetWidth / 2;

        // Position track so slide center is at screen center
        return containerCenter - slideCenterInTrack;
      }
    }

    // Fallback calculation
    const slideUnit = SLIDE_WIDTH + SLIDE_GAP;
    const targetPosition = (centerOffset + index) * slideUnit;
    const containerCenter = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    return containerCenter - targetPosition - SLIDE_WIDTH / 2;
  }, [centerOffset]);

  // Initial positioning - delay to ensure DOM is ready
  useEffect(() => {
    if (trackRef.current && imagesLoaded) {
      // Small delay to ensure slides are rendered with correct dimensions
      const timer = setTimeout(() => {
        const initialPos = getTrackPosition(currentIndex);
        trackPositionRef.current = initialPos;
        gsap.set(trackRef.current, { x: initialPos });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded, getTrackPosition, currentIndex]);

  // Initial entry animation (Phase 1 & 2) - runs only once
  useGSAP(() => {
    if (!imagesLoaded || !containerRef.current || hasAnimated) return;

    // Get the visible slides (center 5)
    const visibleSlideRefs = slideRefs.current
      .slice(centerOffset - 2, centerOffset + 3)
      .filter((el): el is HTMLDivElement => el !== null);

    if (visibleSlideRefs.length === 0) return;

    const masterTimeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        setPhase('ready');
        setHasAnimated(true);
      },
    });

    // Phase 1: Set initial state - all images below viewport
    gsap.set(visibleSlideRefs, { y: '120%', opacity: 0, scale: 0.9 });

    // Staggered entry: outer first, center last
    const staggerDelays = [0, 0.15, 0.3, 0.15, 0];
    visibleSlideRefs.forEach((el, index) => {
      masterTimeline.to(el, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, staggerDelays[index] ?? 0);
    });

    masterTimeline.addLabel('entryComplete');
    masterTimeline.call(() => setPhase('entering'), [], 0);

    // Hold at equal size
    masterTimeline.to({}, { duration: 0.8 }, 'entryComplete');
    masterTimeline.addLabel('focusStart');
    masterTimeline.call(() => setPhase('focusing'), [], 'focusStart');

    gsap.delayedCall(0.3, () => masterTimeline.play());

    return () => masterTimeline.kill();
  }, { scope: containerRef, dependencies: [imagesLoaded, hasAnimated, centerOffset] });

  // Smooth slide animation
  const animateToIndex = useCallback((newIndex: number, direction: number) => {
    if (!trackRef.current || !hasAnimated || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setPhase('sliding');

    const newPos = getTrackPosition(newIndex);
    const newColor = slides[newIndex]?.overlayColor || '#ED6C00';

    // Animate the track smoothly - no bounce, smooth transition
    gsap.to(trackRef.current, {
      x: newPos,
      duration: 0.7,
      ease: 'power1.inOut',
      onUpdate: () => {
        trackPositionRef.current = gsap.getProperty(trackRef.current, 'x') as number;
      },
      onComplete: () => {
        trackPositionRef.current = newPos;
        setCurrentIndex(newIndex);
        setDisplayIndex(newIndex);
        isAnimatingRef.current = false;
        setPhase('ready');

        // Check if we need to reset position for infinite scroll
        if (newIndex >= slides.length) {
          const resetIndex = newIndex % slides.length;
          const resetPos = getTrackPosition(resetIndex);
          gsap.set(trackRef.current, { x: resetPos });
          trackPositionRef.current = resetPos;
          setCurrentIndex(resetIndex);
        } else if (newIndex < 0) {
          const resetIndex = slides.length + (newIndex % slides.length);
          const resetPos = getTrackPosition(resetIndex);
          gsap.set(trackRef.current, { x: resetPos });
          trackPositionRef.current = resetPos;
          setCurrentIndex(resetIndex);
        }
      },
    });

    // Update display index immediately for text
    const actualNewIndex = ((newIndex % slides.length) + slides.length) % slides.length;
    setDisplayIndex(actualNewIndex);

    // Animate color change
    if (onColorChange) {
      onColorChange(newColor);
    }
  }, [hasAnimated, getTrackPosition, slides, onColorChange]);

  const paginate = useCallback((direction: number) => {
    if (phase !== 'ready' || isAnimatingRef.current) return;

    const newIndex = currentIndex + direction;
    animateToIndex(newIndex, direction);
  }, [phase, currentIndex, animateToIndex]);

  const goToSlide = useCallback((index: number) => {
    if (phase !== 'ready' || isAnimatingRef.current) return;
    const actualCurrentIndex = currentIndex % slides.length;
    if (index === actualCurrentIndex) return;

    const direction = index > actualCurrentIndex ? 1 : -1;
    // Calculate the target index in the extended array
    const targetIndex = currentIndex + (index - actualCurrentIndex);
    animateToIndex(targetIndex, direction);
  }, [phase, currentIndex, slides.length, animateToIndex]);

  // Auto-play
  useEffect(() => {
    if (phase !== 'ready' || autoPlayInterval <= 0) return;

    autoPlayRef.current = setInterval(() => paginate(1), autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [phase, autoPlayInterval, paginate]);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (phase !== 'ready') return;
    isDragging.current = true;
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - dragStartX.current;
    if (diff < -50) paginate(1);
    else if (diff > 50) paginate(-1);
  };

  const allSlides = extendedSlides();
  const currentSlide = slides[displayIndex];

  // Get styles for each slide based on its position relative to current
  const getSlideStyles = (slideArrayIndex: number): React.CSSProperties => {
    const relativeToCenter = slideArrayIndex - (centerOffset + currentIndex);
    const isCenter = relativeToCenter === 0;
    const distanceFromCenter = Math.abs(relativeToCenter);

    if (!hasAnimated) {
      return {
        width: `${SLIDE_WIDTH}px`,
        height: 'clamp(450px, 60vh, 680px)',
        opacity: distanceFromCenter <= 2 ? 1 : 0,
      };
    }

    const baseOpacity = distanceFromCenter === 0 ? 1 : distanceFromCenter === 1 ? 0.85 : distanceFromCenter === 2 ? 0.7 : 0.3;

    return {
      width: isCenter ? `${SLIDE_WIDTH * 1.2}px` : `${SLIDE_WIDTH}px`,
      height: isCenter ? 'clamp(520px, 70vh, 800px)' : 'clamp(450px, 60vh, 680px)',
      opacity: baseOpacity,
      transform: isCenter ? 'scale(1.05)' : 'scale(0.95)',
      zIndex: 10 - distanceFromCenter,
      transition: 'width 0.4s ease, height 0.4s ease, transform 0.4s ease, opacity 0.4s ease',
    };
  };

  return (
    <div ref={containerRef} className={cn('relative w-full h-screen overflow-hidden', className)}>
      {/* Slider Track - Continuous Horizontal Scroll */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div
          ref={trackRef}
          className="flex items-start pt-[12vh] h-full will-change-transform"
          style={{ gap: `${SLIDE_GAP}px`, direction: 'ltr' }}
        >
          {allSlides.map((slide, arrayIndex) => {
            const originalIndex = arrayIndex % slides.length;
            const relativeToCenter = arrayIndex - (centerOffset + currentIndex);
            const isCenter = relativeToCenter === 0;
            const distanceFromCenter = Math.abs(relativeToCenter);
            const isVisible = distanceFromCenter <= 3;
            const styles = getSlideStyles(arrayIndex);

            return (
              <div
                key={`slide-${arrayIndex}`}
                ref={(el) => { slideRefs.current[arrayIndex] = el; }}
                className={cn(
                  'relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer',
                  isCenter && hasAnimated && 'rounded-3xl shadow-2xl'
                )}
                style={styles}
                onClick={() => {
                  if (relativeToCenter < 0) paginate(-1);
                  else if (relativeToCenter > 0) paginate(1);
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {/* Color overlay for non-center slides - heavy overlay like reference */}
                {!isCenter && isVisible && hasAnimated && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-500"
                    style={{
                      opacity: distanceFromCenter === 1 ? 0.85 : 0.92,
                      backgroundColor: currentSlide?.overlayColor || '#ED6C00',
                    }}
                  />
                )}

                {/* Edge darkening for far slides */}
                {distanceFromCenter >= 2 && hasAnimated && (
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{ backgroundColor: `rgba(0,0,0,${0.1 * distanceFromCenter})` }}
                  />
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* Left Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-[28%] z-20 flex flex-col justify-between pt-[20vh] pb-16 px-8 md:px-12 lg:px-16 pointer-events-none" style={{ fontFamily }}>
        {/* Top-left: Vision statement (simplified) */}
        <div className="text-start max-w-[320px]">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-snug drop-shadow-lg">
            {dictionary?.visionStatement || 'نسعى لصناعة محتوى إعلامي مبتكر يعكس هوية عملائنا ويصل إلى قلوب الجمهور'}
          </p>
        </div>
        {/* Bottom-left: Main text (static) */}
        <div>
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none drop-shadow-lg">
            {dictionary?.leftPanel || 'الإبداع'}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-[20%] z-20 flex flex-col items-end justify-between pt-[10vh] pb-16 pr-8 md:pr-12 lg:pr-16 pl-4 pointer-events-none" style={{ fontFamily }}>
        {/* Top-right: Badge (static) */}
        <div className="pointer-events-auto">
          <EventBadge heroColor={currentSlide?.overlayColor} />
        </div>
        {/* Bottom-right: Main text (static) */}
        <div className="text-end">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none drop-shadow-lg">
            {dictionary?.rightPanel || 'الهوية'}
          </div>
        </div>
      </div>

      {/* Bottom Navigation with Timer Progress - positioned higher */}
      <div className="absolute left-0 right-0 z-30" style={{ bottom: '14%' }}>
        <div className="flex flex-col items-center gap-4">
          {/* Slide indicators with timer */}
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
                  {/* Inactive: simple dot */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-white/40 hover:bg-white/60 transition-colors" />
                  )}

                  {/* Active: circle with square center and timer progress */}
                  {isActive && (
                    <>
                      {/* Circular progress track */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 24 24">
                        {/* Background circle */}
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1.5"
                        />
                        {/* Progress circle */}
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
                        {/* Full circle when sliding */}
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
                      {/* Square in center */}
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

      {/* Scroll Down Caption - positioned below indicators */}
      <div className={cn(
        'absolute left-1/2 -translate-x-1/2 z-30 transition-all duration-500 flex flex-col items-center gap-1.5',
        phase === 'ready' || phase === 'sliding' ? 'opacity-100' : 'opacity-0'
      )} style={{ bottom: '2%' }}>
        {/* Masked container for text scroll loop */}
        <div className="h-[14px] overflow-hidden relative">
          <div className="animate-scroll-loop absolute inset-x-0">
            <div className="h-[14px] flex items-center justify-center">
              <span className="text-[11px] text-white/90 font-medium tracking-[0.15em] uppercase drop-shadow-lg">
                {dictionary?.scrollDown || 'Scroll Down'}
              </span>
            </div>
            <div className="h-[14px] flex items-center justify-center">
              <span className="text-[11px] text-white/90 font-medium tracking-[0.15em] uppercase drop-shadow-lg">
                {dictionary?.scrollDown || 'Scroll Down'}
              </span>
            </div>
          </div>
        </div>
        {/* Masked container for arrow scroll loop */}
        <div className="h-[12px] overflow-hidden relative">
          <div className="animate-scroll-loop absolute inset-x-0">
            <div className="h-[12px] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/80">
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="h-[12px] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/80">
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
