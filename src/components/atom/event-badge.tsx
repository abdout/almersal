'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EventBadgeProps {
  heroColor?: string;
  className?: string;
}

// Map hero background color to contrasting badge color
function getBadgeColor(heroColor: string): string {
  const colorMap: Record<string, string> = {
    '#ED6C00': '#E11D48', // Orange hero → Rose badge
    '#2639A6': '#DC2626', // Blue hero → Red badge
    '#CC2525': '#16A34A', // Red hero → Green badge
    '#139A39': '#E11D48', // Green hero → Rose badge
    '#FFD900': '#E11D48', // Yellow hero → Rose badge
    '#8B5CF6': '#F59E0B', // Purple hero → Amber badge
    '#0891B2': '#DC2626', // Cyan hero → Red badge
  };

  return colorMap[heroColor] || '#FFD900'; // Default yellow
}

export function EventBadge({ heroColor = '#FFD900', className }: EventBadgeProps) {
  const badgeColor = getBadgeColor(heroColor);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <motion.div
        className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] mt-4 cursor-pointer"
        initial="idle"
        whileHover="hover"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Circle with cut */}
          <motion.path
            fill={badgeColor}
            animate={{ fill: badgeColor }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            variants={{
              idle: { d: "M 48 0 A 50 50 0 1 0 93 24 L 48 0 Z" },
              hover: { d: "M 40 1 A 50 50 0 1 0 97 33 L 40 1 Z" }
            }}
          />
          {/* White peel */}
          <motion.path
            fill="white"
            style={{ filter: 'drop-shadow(-1px 1px 2px rgba(0,0,0,0.15))' }}
            variants={{
              idle: { d: "M 48 0 L 93 24 Q 70 28, 48 0 Z" },
              hover: { d: "M 40 1 L 97 33 Q 68 38, 40 1 Z" }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
