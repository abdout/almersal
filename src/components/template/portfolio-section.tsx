'use client';

import { motion } from 'framer-motion';
import { InfiniteSlider } from '@/components/atom/infinite-slider';
import Image from 'next/image';

interface PortfolioSectionProps {
  dictionary: {
    portfolio: {
      title: string;
      subtitle: string;
    };
  };
}

const portfolioImages = [
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=600&h=400&q=80',
];

export function PortfolioSection({ dictionary }: PortfolioSectionProps) {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{dictionary.portfolio.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {dictionary.portfolio.subtitle}
          </p>
        </motion.div>
      </div>

      {/* First row - left to right */}
      <InfiniteSlider speed={50} gap={24} className="mb-6">
        {portfolioImages.map((src, index) => (
          <div
            key={`row1-${index}`}
            className="relative w-80 h-52 md:w-96 md:h-64 rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={src}
              alt={`Portfolio ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </InfiniteSlider>

      {/* Second row - right to left */}
      <InfiniteSlider speed={50} gap={24} reverse>
        {[...portfolioImages].reverse().map((src, index) => (
          <div
            key={`row2-${index}`}
            className="relative w-80 h-52 md:w-96 md:h-64 rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={src}
              alt={`Portfolio ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </InfiniteSlider>
    </section>
  );
}
