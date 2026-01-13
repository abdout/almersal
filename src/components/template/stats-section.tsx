'use client';

import { motion } from 'framer-motion';
import { Counter } from '@/components/atom/counter';

interface StatsSectionProps {
  dictionary: {
    stats: {
      projects: string;
      clients: string;
      awards: string;
      years: string;
    };
  };
}

const stats = [
  { value: 250, key: 'projects' },
  { value: 120, key: 'clients' },
  { value: 15, key: 'awards' },
  { value: 8, key: 'years' },
] as const;

export function StatsSection({ dictionary }: StatsSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <Counter
                end={stat.value}
                delay={index * 150}
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
              />
              <p className="mt-2 text-background/70 text-sm md:text-base uppercase tracking-wider">
                {dictionary.stats[stat.key]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
