'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Locale, Dictionary } from '@/lib/i18n';

interface VisitorSectionProps {
  lang: Locale;
  dictionary: Dictionary;
}

const visitorItems = [
  'parents',
  'highSchool',
  'workingAdults',
  'international',
  'recruiters',
] as const;

export function VisitorSection({ lang, dictionary }: VisitorSectionProps) {
  const isRTL = lang === 'ar';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const visitorDict = dictionary.visitor as {
    label: string;
    subtitle: string;
    items: Record<string, { title: string; description: string }>;
  };

  return (
    <section className="py-12 md:py-32 bg-background overflow-hidden">
      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden px-4">
        {/* Title - Centered on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-black text-foreground leading-tight">
            {visitorDict.label}
          </h2>
          <p className="text-[#ED6C00] font-medium text-base mt-2">
            {visitorDict.subtitle}
          </p>
        </motion.div>

        {/* List - Full width */}
        <div className="space-y-0">
          {visitorItems.map((itemKey, index) => {
            const item = visitorDict.items[itemKey];
            return (
              <div
                key={itemKey}
                className="border-b border-black last:border-b-0"
              >
                <a
                  href="#"
                  className="group flex items-center gap-3 py-4"
                >
                  {/* Arrow Icon */}
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ED6C00] flex items-center justify-center">
                    <ArrowRight className={`w-3.5 h-3.5 text-white ${isRTL ? 'rotate-180' : ''}`} />
                  </span>

                  {/* Title */}
                  <span className="text-lg font-bold text-foreground group-active:text-[#ED6C00] transition-colors">
                    {item.title}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout - Original */}
      <div className={`hidden lg:grid grid-cols-12 gap-10 items-start`}>
        {/* Left Column - Title (within container) */}
        <div className={`col-span-4 col-start-1 px-6 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] lg:pr-0 ${isRTL ? 'order-2' : 'order-1'}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-end text-right"
          >
            <h2 className="text-5xl lg:text-[3.5rem] font-black text-foreground leading-none text-right">
              {visitorDict.label.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>
            <p className="text-[#ED6C00] font-medium text-lg mt-4 text-right">
              {visitorDict.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Right Column - List (extends to right edge) */}
        <div className={`col-span-8 pl-4 pr-6 -mt-4 ${isRTL ? 'order-1' : 'order-2'}`}>
          <div className="space-y-0">
            {visitorItems.map((itemKey, index) => {
              const item = visitorDict.items[itemKey];
              const isHovered = hoveredIndex === index;
              const hasHover = hoveredIndex !== null;
              const shouldFade = hasHover && !isHovered;

              return (
                <div
                  key={itemKey}
                  className="transition-all duration-300"
                  style={{
                    opacity: shouldFade ? 0.2 : 1,
                    borderBottom: index < visitorItems.length - 1 ? `1px solid ${shouldFade ? 'rgba(0,0,0,0.2)' : '#000'}` : 'none',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <a
                    href="#"
                    className="group flex items-center gap-6 py-8"
                  >
                    {/* Arrow Icon */}
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#ED6C00] flex items-center justify-center">
                      <ArrowRight className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
                    </span>

                    {/* Title */}
                    <span className="flex-shrink-0 text-2xl font-bold text-foreground group-hover:text-[#ED6C00] transition-colors duration-300">
                      {item.title}
                    </span>

                    {/* Spacer */}
                    <span className="flex-grow" />

                    {/* Description */}
                    <span className={`text-base text-muted-foreground whitespace-nowrap ${isRTL ? 'text-left' : 'text-right'}`}>
                      {item.description}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
