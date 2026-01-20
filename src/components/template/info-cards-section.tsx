'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

interface InfoCardsSectionProps {
  dictionary: Dictionary;
}

export function InfoCardsSection({ dictionary }: InfoCardsSectionProps) {
  const { infoCards } = dictionary;

  return (
    <section className="bg-primary py-3 md:py-4">
      {/* White container - edge to edge with big rounded corners */}
      <div className="bg-white rounded-[80px] md:rounded-[120px] p-12 overflow-hidden">
        {/* Two cards in row with tiny gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left Card - Open Campus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="bg-gray-100 rounded-[64px] md:rounded-[80px] p-8 md:p-12 flex flex-col relative overflow-hidden"
          >
            <span className="text-primary font-medium text-sm mb-2">
              {infoCards.campus.label}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-4">
              {infoCards.campus.title}
              <span className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-primary" />
              </span>
            </h3>
            <p className="text-muted-foreground mb-8">
              {infoCards.campus.description}
            </p>
            {/* Campus illustration - overflows bottom */}
            <div className="mt-auto -mb-12 -mx-4">
              <img
                src="https://media-arts.ac.jp/ma_cms/wp-content/themes/media-arts/assets/imgs/material/oc/mat-campus.png"
                alt="Campus illustration"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </motion.div>

          {/* Right Card - School Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-gray-100 rounded-[64px] md:rounded-[80px] p-8 md:p-12 flex flex-col relative overflow-hidden"
          >
            <span className="text-primary font-medium text-sm mb-2">
              {infoCards.guide.label}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-4">
              {infoCards.guide.title}
              <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white" />
              </span>
            </h3>
            <p className="text-muted-foreground mb-8">
              {infoCards.guide.description}
            </p>
            {/* Pamphlet image - positioned to overflow */}
            <div className="mt-auto -mb-12 -mr-12">
              <img
                src="https://media-arts.ac.jp/ma_cms/wp-content/themes/media-arts/assets/imgs/material/mat-school-guide.png?v1"
                alt="School guide pamphlet"
                className="w-full h-auto max-w-lg ml-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
