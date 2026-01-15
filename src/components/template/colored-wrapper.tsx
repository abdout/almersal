'use client';

import { useState, useCallback, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ColoredWrapperProps {
  children: (onColorChange: (color: string) => void) => ReactNode;
  secondSection: ReactNode;
}

export function ColoredWrapper({ children, secondSection }: ColoredWrapperProps) {
  const [currentColor, setCurrentColor] = useState('oklch(0.65 0.2 45)');
  const { scrollY } = useScroll();

  // Parallax effect for the colored section
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  const handleColorChange = useCallback((color: string) => {
    setCurrentColor(color);
  }, []);

  return (
    <div className="relative">
      {/* Colored section with dynamic background */}
      <motion.div
        className="relative z-20 rounded-b-[40px] overflow-hidden"
        style={{
          backgroundColor: currentColor,
          y,
        }}
        animate={{ backgroundColor: currentColor }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Hero Section */}
        {children(handleColorChange)}

        {/* Second Section (Pickup/Featured) */}
        <div className="relative">
          {secondSection}
        </div>
      </motion.div>

      {/* Shadow/gradient at bottom for depth effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))',
          transform: 'translateY(100%)',
        }}
      />
    </div>
  );
}
