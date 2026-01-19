'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface EventBadgeProps {
  className?: string;
}

export function EventBadge({ className }: EventBadgeProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <motion.div
        className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] mt-4 cursor-pointer"
        initial="idle"
        whileHover="hover"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Yellow circle with cut */}
          <motion.path
            fill="#FFD900"
            variants={{
              idle: { d: "M 48 0 A 50 50 0 1 0 93 24 L 48 0 Z" },
              hover: { d: "M 40 1 A 50 50 0 1 0 97 33 L 40 1 Z" }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          {/* White peel - straight top edge along cut, curved inner edge */}
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
