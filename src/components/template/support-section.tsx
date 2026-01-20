'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import type { Locale, Dictionary } from '@/lib/i18n';

interface SupportSectionProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function SupportSection({ lang, dictionary }: SupportSectionProps) {
  const isRTL = lang === 'ar';

  const supportDict = dictionary.support as {
    label: string;
    subtitle: string;
    title: string;
    description: string;
    cta: string;
  };

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isRTL ? '' : ''}`}>
          {/* Image - Left side (Right in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Professional mentorship and career support"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Text Content - Right side (Left in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            {/* Large Label with Highlight */}
            <div className="mb-6">
              <span className="relative inline-block">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground">
                  {supportDict.label}
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-3 md:h-4 bg-primary/30 -z-10" />
              </span>
              <p className="text-[#ED6C00] font-medium text-lg mt-2">
                {supportDict.subtitle}
              </p>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {supportDict.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              {supportDict.description}
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 pl-6 pr-3 py-3 border-[1px] border-solid border-[#ED6C00] bg-transparent text-[#ED6C00] rounded-full font-medium hover:bg-[#ED6C00] hover:text-white transition-all duration-300"
            >
              <span>{supportDict.cta}</span>
              <span className="w-8 h-8 rounded-full bg-[#ED6C00] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#ED6C00] transition-all duration-300">
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
