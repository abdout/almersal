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
    <section className="bg-[#ED6C00] py-2 md:py-4">
      {/* White container - edge to edge with responsive rounded corners */}
      <div className="bg-white rounded-[40px] md:rounded-[80px] lg:rounded-[120px] p-4 md:p-8 lg:p-12 overflow-hidden">
        {/* Two cards in row with tiny gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left Card - Open Campus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group bg-gray-100 hover:bg-[#ED6C00]/15 rounded-[32px] md:rounded-[64px] lg:rounded-[80px] p-5 md:p-8 lg:p-10 relative overflow-hidden min-h-[280px] md:min-h-[420px] lg:min-h-[520px] transition-colors duration-300"
          >
            <span className="text-[#ED6C00] font-bold text-sm md:text-base mb-1 md:mb-2 block">
              {infoCards.campus.label}
            </span>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black flex items-center gap-2 md:gap-3 mb-2 md:mb-3 transition-colors duration-300 group-hover:text-[#ED6C00]">
              {infoCards.campus.title}
              <span className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#ED6C00] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </span>
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm lg:text-base max-w-[70%] md:max-w-[60%]">
              {infoCards.campus.description}
            </p>
            {/* Campus illustration - bottom right, reveals on hover */}
            <img
              src="https://media-arts.ac.jp/ma_cms/wp-content/themes/media-arts/assets/imgs/material/oc/mat-campus.png"
              alt="Campus illustration"
              className="absolute bottom-0 right-0 w-[16rem] md:w-[26rem] lg:w-[36rem] h-auto translate-y-44 md:translate-y-72 translate-x-16 md:translate-x-28 transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          {/* Right Card - School Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-gray-100 hover:bg-[#ED6C00]/15 rounded-[32px] md:rounded-[64px] lg:rounded-[80px] p-5 md:p-8 lg:p-10 relative overflow-hidden min-h-[280px] md:min-h-[420px] lg:min-h-[520px] transition-colors duration-300"
          >
            <span className="text-[#ED6C00] font-bold text-sm md:text-base mb-1 md:mb-2 block">
              {infoCards.guide.label}
            </span>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black flex items-center gap-2 md:gap-3 mb-2 md:mb-3 transition-colors duration-300 group-hover:text-[#ED6C00]">
              {infoCards.guide.title}
              <span className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#ED6C00] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </span>
            </h3>
            <p className="text-muted-foreground text-xs md:text-sm lg:text-base max-w-[70%] md:max-w-[60%]">
              {infoCards.guide.description}
            </p>
            {/* Pamphlet image - bottom right, reveals on hover */}
            <img
              src="https://media-arts.ac.jp/ma_cms/wp-content/themes/media-arts/assets/imgs/material/mat-school-guide.png?v1"
              alt="School guide pamphlet"
              className="absolute bottom-0 right-0 w-[18rem] md:w-[30rem] lg:w-[42rem] h-auto translate-y-28 md:translate-y-44 translate-x-16 md:translate-x-28 transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
