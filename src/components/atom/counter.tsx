'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface CounterProps {
  end: number;
  suffix?: string;
  delay?: number;
  className?: string;
}

export function Counter({ end, suffix = '+', delay = 0, className }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2500,
  });

  const displayValue = useTransform(springValue, (val) => Math.round(val));

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        springValue.set(end);
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasAnimated, springValue, end, delay]);

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (val) => {
      setCurrentValue(val);
    });
    return () => unsubscribe();
  }, [displayValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      <motion.span
        className="tabular-nums"
        initial={{ scale: 1 }}
        animate={hasAnimated ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.3, delay: 2 }}
      >
        {currentValue}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 2.2 }}
        className="text-primary-500"
      >
        {suffix}
      </motion.span>
    </motion.div>
  );
}
