'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// Grid item with distinct gray shades
interface GridItem {
  id: string;
  color: string; // Hex color for precise gray shades
  parallaxOffset: number;
}

// 11 items with distinct gray shades - varied for visual distinction
const gridItems: GridItem[] = [
  { id: 'a', color: '#E8E8E8', parallaxOffset: 180 },  // Top-left small 1
  { id: 'b', color: '#D0D0D0', parallaxOffset: 160 },  // Top-left small 2
  { id: 'c', color: '#B8B8B8', parallaxOffset: 140 },  // Middle col top
  { id: 'd', color: '#909090', parallaxOffset: 100 },  // Left big (below a,b)
  { id: 'e', color: '#A0A0A0', parallaxOffset: 120 },  // Middle col bottom
  { id: 'f', color: '#787878', parallaxOffset: 80 },   // Third col big
  { id: 'tall', color: '#F5F5F5', parallaxOffset: 60 }, // Right tall (40% width)
  { id: 'g', color: '#C8C8C8', parallaxOffset: 200 },  // Bottom row 1
  { id: 'h', color: '#686868', parallaxOffset: 170 },  // Bottom row 2
  { id: 'i', color: '#989898', parallaxOffset: 150 },  // Bottom row 3
  { id: 'j', color: '#E0E0E0', parallaxOffset: 190 },  // Bottom row 4
];

// Parallax grid image component
function GridImage({
  item,
  scrollYProgress,
  otherOpacity,
  className = '',
  style = {},
}: {
  item: GridItem;
  scrollYProgress: MotionValue<number>;
  otherOpacity?: MotionValue<number>;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Parallax reveal - images start below and move up
  const y = useTransform(
    scrollYProgress,
    [0, 0.4],
    [item.parallaxOffset, 0]
  );

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg will-change-transform ${className}`}
      style={{
        y,
        opacity: otherOpacity,
        backgroundColor: item.color,
        ...style,
      }}
    />
  );
}

export function PhotoGridSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setViewportSize] = useState({ width: 0, height: 0 });

  // Scroll progress through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end start'],
  });

  // Calculate viewport dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    const debouncedUpdate = debounce(updateDimensions, 100);
    window.addEventListener('resize', debouncedUpdate);
    return () => window.removeEventListener('resize', debouncedUpdate);
  }, []);

  // Other images fade out during zoom phase
  const otherOpacity = useTransform(scrollYProgress, [0.65, 0.85], [1, 0]);

  // Get items by id for clarity
  const getItem = (id: string) => gridItems.find(item => item.id === id)!;

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh]"
      style={{ contain: 'layout style paint' }}
    >
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Grid container */}
        <div className="absolute inset-0 px-3 md:px-4 lg:px-6 py-4 flex items-center">
          {/*
            Layout: 60% left (3 sub-cols) + 40% right (tall)

            60% section has sub-columns: 40% | 20% | 40%
            - 40%: [a][b] on top, [d] big below
            - 20%: [c] top, [e] bottom
            - 40%: [f] one big div

            40% right: [tall] full height

            Bottom row: [g][h][i][j]
          */}
          <div className="w-full h-[88vh] flex flex-col gap-2 md:gap-3">
            {/* Main content area (top ~75%) */}
            <div className="flex-[3] flex gap-2 md:gap-3">
              {/* Left 60% section */}
              <div className="flex-[6] flex gap-2 md:gap-3">
                {/* First sub-column 40% of 60% */}
                <div className="flex-[4] flex flex-col gap-2 md:gap-3">
                  {/* Top row: two small squares */}
                  <div className="flex-[2] flex gap-2 md:gap-3">
                    <GridImage
                      item={getItem('a')}
                      scrollYProgress={scrollYProgress}
                      otherOpacity={otherOpacity}
                      className="flex-1"
                    />
                    <GridImage
                      item={getItem('b')}
                      scrollYProgress={scrollYProgress}
                      otherOpacity={otherOpacity}
                      className="flex-1"
                    />
                  </div>
                  {/* Big div below */}
                  <GridImage
                    item={getItem('d')}
                    scrollYProgress={scrollYProgress}
                    otherOpacity={otherOpacity}
                    className="flex-[3]"
                  />
                </div>

                {/* Middle sub-column 20% of 60% */}
                <div className="flex-[2] flex flex-col gap-2 md:gap-3">
                  <GridImage
                    item={getItem('c')}
                    scrollYProgress={scrollYProgress}
                    otherOpacity={otherOpacity}
                    className="flex-1"
                  />
                  <GridImage
                    item={getItem('e')}
                    scrollYProgress={scrollYProgress}
                    otherOpacity={otherOpacity}
                    className="flex-1"
                  />
                </div>

                {/* Third sub-column 40% of 60% - one big div */}
                <GridImage
                  item={getItem('f')}
                  scrollYProgress={scrollYProgress}
                  otherOpacity={otherOpacity}
                  className="flex-[4]"
                />
              </div>

              {/* Right 40% - tall image */}
              <GridImage
                item={getItem('tall')}
                scrollYProgress={scrollYProgress}
                otherOpacity={otherOpacity}
                className="flex-[4]"
              />
            </div>

            {/* Bottom row (~25%) - 4 items */}
            <div className="flex-1 flex gap-2 md:gap-3">
              <GridImage
                item={getItem('g')}
                scrollYProgress={scrollYProgress}
                otherOpacity={otherOpacity}
                className="flex-1"
              />
              <GridImage
                item={getItem('h')}
                scrollYProgress={scrollYProgress}
                otherOpacity={otherOpacity}
                className="flex-1"
              />
              <GridImage
                item={getItem('i')}
                scrollYProgress={scrollYProgress}
                otherOpacity={otherOpacity}
                className="flex-1"
              />
              <GridImage
                item={getItem('j')}
                scrollYProgress={scrollYProgress}
                otherOpacity={otherOpacity}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Debounce utility
function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}
