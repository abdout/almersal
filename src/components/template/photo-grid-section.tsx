'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { MobilePhotoGrid } from '@/components/atom/mobile-photo-grid';

interface GridItem {
  id: string;
  color: string;
}

const gridItems: GridItem[] = [
  { id: 'a', color: '#E8E8E8' },
  { id: 'b', color: '#D0D0D0' },
  { id: 'c', color: '#B8B8B8' },
  { id: 'd', color: '#909090' },
  { id: 'e', color: '#A0A0A0' },
  { id: 'tall', color: '#F5F5F5' },
  { id: 'g', color: '#C8C8C8' },
  { id: 'h', color: '#686868' },
  { id: 'i', color: '#989898' },
  { id: 'j', color: '#E0E0E0' },
  { id: 'k', color: '#C0C0C0' },
];

function GridImage({
  item,
  className = '',
}: {
  item: GridItem;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ backgroundColor: item.color }}
    />
  );
}

function ZoomableE({
  item,
  scale,
  borderRadius,
  zIndex,
  className = '',
}: {
  item: GridItem;
  scale: MotionValue<number>;
  borderRadius: MotionValue<number>;
  zIndex: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg will-change-transform ${className}`}
      style={{
        backgroundColor: item.color,
        scale,
        borderRadius,
        zIndex,
        transformOrigin: 'center center',
      }}
    />
  );
}

export function PhotoGridSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Phase 1: Grid parallax reveal (0 - 0.2)
  const yRaw = useTransform(scrollYProgress, [0, 0.2], [400, 0]);
  const y = useSpring(yRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Phase 2: "e" zooms (0.5 - 0.92) - gradual zoom, then brief hold before flip
  const eScale = useTransform(scrollYProgress, [0.5, 0.92], [1, 30]);

  // Border radius of "e" goes to 0 as it scales
  const eBorderRadius = useTransform(scrollYProgress, [0.5, 0.7], [8, 0]);

  // Z-index jumps up when zoom starts
  const eZIndex = useTransform(scrollYProgress, [0.49, 0.5], [0, 50]);

  // Fade out other items as "e" zooms
  const otherOpacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0]);

  const getItem = (id: string) => gridItems.find(item => item.id === id)!;

  return (
    <section ref={containerRef} className="relative h-[150vh] md:h-[300vh]">
      {/* Mobile Layout - Infinite scrolling marquee grid */}
      <div className="md:hidden sticky top-0 h-screen overflow-hidden flex items-center">
        <MobilePhotoGrid />
      </div>

      {/* Desktop Layout - Original complex grid with zoom effect */}
      <div
        className="hidden md:block sticky top-0 h-screen overflow-hidden px-4 md:px-5 py-4"
        style={{ contain: 'layout style paint' }}
      >
        <motion.div
          className="w-full h-full flex flex-col gap-4 md:gap-5 will-change-transform"
          style={{ y }}
        >
          {/* TOP: 3 main columns using CSS Grid */}
          <div
            className="flex-[2.5] grid gap-4 md:gap-5"
            style={{ gridTemplateColumns: '38fr 24fr 38fr' }}
          >
            {/* LEFT (38%): [a 40%][b 60%] top 40%, [d] bottom 60% */}
            <motion.div className="flex flex-col gap-4 md:gap-5" style={{ opacity: otherOpacity }}>
              <div className="flex-[4] flex gap-4 md:gap-5">
                <GridImage item={getItem('a')} className="flex-[4]" />
                <GridImage item={getItem('b')} className="flex-[6]" />
              </div>
              <GridImage item={getItem('d')} className="flex-[6]" />
            </motion.div>

            {/* MID (24%): [c 60%] top, [e 40%] bottom */}
            <div className="flex flex-col gap-4 md:gap-5">
              <motion.div className="flex-[6]" style={{ opacity: otherOpacity }}>
                <GridImage item={getItem('c')} className="h-full" />
              </motion.div>
              <ZoomableE
                item={getItem('e')}
                scale={eScale}
                borderRadius={eBorderRadius}
                zIndex={eZIndex}
                className="flex-[4]"
              />
            </div>

            {/* RIGHT (38%): [tall] full height */}
            <motion.div style={{ opacity: otherOpacity }}>
              <GridImage item={getItem('tall')} className="h-full" />
            </motion.div>
          </div>

          {/* BOTTOM: 4 items */}
          <motion.div
            className="flex-[1.3] flex gap-4 md:gap-5"
            style={{ opacity: otherOpacity }}
          >
            <GridImage item={getItem('g')} className="flex-[1.3]" />
            <GridImage item={getItem('h')} className="flex-[0.9]" />
            <GridImage item={getItem('i')} className="flex-[1.3]" />
            <div className="flex-[0.8] flex flex-col gap-4 md:gap-5">
              <GridImage item={getItem('j')} className="flex-1" />
              <GridImage item={getItem('k')} className="flex-1" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
