'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useHeroColor, type SectionType } from '@/components/template/hero-color-context';

interface SectionObserverProviderProps {
  children: ReactNode;
}

export function SectionObserverProvider({ children }: SectionObserverProviderProps) {
  const { setCurrentSection, setIsFooterVisible } = useHeroColor();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const footerObserverRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Observer for section type detection
    // Uses rootMargin to detect when section reaches top of viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Sort entries by their position on screen (top to bottom)
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        // Find the section closest to the top of the viewport
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries[0];
          const sectionType = topEntry.target.getAttribute('data-section-type') as SectionType;

          if (sectionType && sectionType !== 'footer') {
            setCurrentSection(sectionType);
          }
        }
      },
      {
        // Observe when sections enter the top 20% of the viewport
        rootMargin: '-80px 0px -80% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5]
      }
    );

    // Separate observer for footer visibility (fly-away trigger)
    footerObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.getAttribute('data-section-type') === 'footer') {
            setIsFooterVisible(entry.isIntersecting);
          }
        });
      },
      {
        // Trigger when footer enters viewport
        rootMargin: '0px 0px 0px 0px',
        threshold: 0
      }
    );

    // Observe all sections with data-section-type attribute
    const sections = document.querySelectorAll('[data-section-type]');
    sections.forEach((section) => {
      const sectionType = section.getAttribute('data-section-type');

      if (sectionType === 'footer') {
        footerObserverRef.current?.observe(section);
      } else {
        observerRef.current?.observe(section);
      }
    });

    return () => {
      observerRef.current?.disconnect();
      footerObserverRef.current?.disconnect();
    };
  }, [setCurrentSection, setIsFooterVisible]);

  return <>{children}</>;
}
