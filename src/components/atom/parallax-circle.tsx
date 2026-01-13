'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxCircleProps {
  color: 'orange' | 'blue' | 'green' | 'pink' | 'yellow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position: { top?: string; bottom?: string; left?: string; right?: string };
  speed?: number;
  className?: string;
}

const colorMap = {
  orange: 'bg-primary-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  pink: 'bg-pink-500',
  yellow: 'bg-yellow-500',
};

const sizeMap = {
  sm: 'w-16 h-16 md:w-24 md:h-24',
  md: 'w-24 h-24 md:w-36 md:h-36',
  lg: 'w-36 h-36 md:w-48 md:h-48',
  xl: 'w-48 h-48 md:w-64 md:h-64',
};

export function ParallaxCircle({
  color,
  size = 'md',
  position,
  speed = 0.5,
  className,
}: ParallaxCircleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <motion.div
      ref={ref}
      style={{ ...position, y }}
      className={cn(
        'fixed rounded-full opacity-60 blur-3xl pointer-events-none z-0',
        colorMap[color],
        sizeMap[size],
        className
      )}
    />
  );
}

export function ParallaxCircles() {
  return (
    <>
      <ParallaxCircle
        color="orange"
        size="xl"
        position={{ top: '10%', left: '-5%' }}
        speed={0.3}
      />
      <ParallaxCircle
        color="blue"
        size="lg"
        position={{ top: '40%', right: '-3%' }}
        speed={0.5}
      />
      <ParallaxCircle
        color="pink"
        size="md"
        position={{ bottom: '30%', left: '10%' }}
        speed={0.4}
      />
      <ParallaxCircle
        color="green"
        size="lg"
        position={{ bottom: '10%', right: '15%' }}
        speed={0.6}
      />
    </>
  );
}
