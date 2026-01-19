'use client';

import { cn } from '@/lib/utils';

interface EventBadgeProps {
  className?: string;
}

export function EventBadge({ className }: EventBadgeProps) {
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] mt-4">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Circle with cut: start at cut point, arc around, end at other cut point, straight line back */}
          <path
            d="M 67 3 A 50 50 0 1 0 97 33 L 67 3 Z"
            fill="#FFD900"
          />
        </svg>
      </div>
    </div>
  );
}
