'use client';

import { motion } from 'framer-motion';
import { FlipCard } from '@/components/atom/flip-card';
import { Video, Camera, Palette, Share2 } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

interface ServicesSectionProps {
  dictionary: Dictionary;
}

const services = [
  { key: 'video', icon: Video, color: 'bg-primary-500' },
  { key: 'photo', icon: Camera, color: 'bg-blue-500' },
  { key: 'design', icon: Palette, color: 'bg-pink-500' },
  { key: 'social', icon: Share2, color: 'bg-green-500' },
] as const;

export function ServicesSection({ dictionary }: ServicesSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{dictionary.services.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {dictionary.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const serviceData = dictionary.services[service.key];

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FlipCard
                  className="h-80"
                  front={
                    <div
                      className={`w-full h-full rounded-2xl ${service.color} flex flex-col items-center justify-center text-white p-6`}
                    >
                      <Icon size={48} className="mb-4" />
                      <h3 className="text-xl font-bold text-center">{serviceData.title}</h3>
                    </div>
                  }
                  back={
                    <div className="w-full h-full rounded-2xl bg-card border border-border flex flex-col items-center justify-center p-6">
                      <h3 className="text-xl font-bold mb-4 text-center">{serviceData.title}</h3>
                      <p className="text-muted-foreground text-center text-sm">
                        {serviceData.description}
                      </p>
                    </div>
                  }
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
