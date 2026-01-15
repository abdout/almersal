'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export type AnimationPhase = 'initial' | 'entering' | 'focusing' | 'ready' | 'sliding';

interface UseGSAPTimelineOptions {
  autoPlay?: boolean;
  onPhaseChange?: (phase: AnimationPhase) => void;
  scope?: React.RefObject<HTMLElement | null>;
}

interface UseGSAPTimelineReturn {
  timeline: React.MutableRefObject<gsap.core.Timeline | null>;
  phase: React.MutableRefObject<AnimationPhase>;
  play: () => void;
  pause: () => void;
  restart: () => void;
  seek: (position: number | string) => void;
  isPlaying: () => boolean;
}

export function useGSAPTimeline(
  options: UseGSAPTimelineOptions = {}
): UseGSAPTimelineReturn {
  const { autoPlay = false, onPhaseChange, scope } = options;

  const timeline = useRef<gsap.core.Timeline | null>(null);
  const phase = useRef<AnimationPhase>('initial');

  const setPhase = useCallback((newPhase: AnimationPhase) => {
    if (newPhase !== phase.current) {
      phase.current = newPhase;
      onPhaseChange?.(newPhase);
    }
  }, [onPhaseChange]);

  useGSAP(() => {
    timeline.current = gsap.timeline({
      paused: !autoPlay,
      defaults: {
        ease: 'power3.out',
      },
    });

    return () => {
      timeline.current?.kill();
      timeline.current = null;
    };
  }, { scope: scope ?? undefined });

  const play = useCallback(() => {
    timeline.current?.play();
  }, []);

  const pause = useCallback(() => {
    timeline.current?.pause();
  }, []);

  const restart = useCallback(() => {
    timeline.current?.restart();
  }, []);

  const seek = useCallback((position: number | string) => {
    timeline.current?.seek(position);
  }, []);

  const isPlaying = useCallback(() => {
    return timeline.current?.isActive() ?? false;
  }, []);

  return {
    timeline,
    phase,
    play,
    pause,
    restart,
    seek,
    isPlaying,
  };
}

export function createStaggeredEntryTimeline(
  elements: (HTMLElement | null)[],
  options: {
    fromY?: string;
    duration?: number;
    staggerPattern?: number[];
  } = {}
): gsap.core.Timeline {
  const {
    fromY = '120%',
    duration = 0.8,
    staggerPattern = [0, 0.15, 0.3, 0.15, 0],
  } = options;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  const validElements = elements.filter((el): el is HTMLElement => el !== null);

  if (validElements.length === 0) return tl;

  tl.set(validElements, {
    y: fromY,
    opacity: 0,
    scale: 0.9,
  });

  validElements.forEach((el, index) => {
    const delay = staggerPattern[index] ?? index * 0.1;
    tl.to(el, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration,
    }, delay);
  });

  return tl;
}

export function createFocusTimeline(
  centerElement: HTMLElement | null,
  sideElements: (HTMLElement | null)[],
  overlayElements: (HTMLElement | null)[],
  options: {
    centerScale?: number;
    sideOpacity?: number;
    overlayOpacity?: number;
    overlayColor?: string;
    duration?: number;
  } = {}
): gsap.core.Timeline {
  const {
    centerScale = 1.08,
    sideOpacity = 0.75,
    overlayOpacity = 0.4,
    overlayColor = '#e07830',
    duration = 0.8,
  } = options;

  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

  if (centerElement) {
    tl.to(centerElement, {
      scale: centerScale,
      zIndex: 10,
      duration,
    }, 0);
  }

  const validSideElements = sideElements.filter((el): el is HTMLElement => el !== null);
  if (validSideElements.length > 0) {
    tl.to(validSideElements, {
      opacity: sideOpacity,
      duration,
    }, 0);
  }

  const validOverlays = overlayElements.filter((el): el is HTMLElement => el !== null);
  if (validOverlays.length > 0) {
    tl.to(validOverlays, {
      opacity: overlayOpacity,
      backgroundColor: overlayColor,
      duration,
    }, 0);
  }

  return tl;
}
