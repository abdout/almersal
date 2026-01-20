'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Locale, Dictionary } from '@/lib/i18n';

interface TopicItem {
  id: string;
  date: string;
  category: 'news' | 'events' | 'workshop';
  image: string;
  title: string;
}

interface TopicsSectionProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function TopicsSection({ lang, dictionary }: TopicsSectionProps) {
  const isRTL = lang === 'ar';

  const topicsDict = dictionary.topics as {
    title: string;
    subtitle: string;
    categories: {
      news: string;
      events: string;
      workshop: string;
    };
    items: TopicItem[];
    viewAll: string;
  };

  return (
    <section className="relative py-12 md:py-32 bg-[#ED6C00] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-10">
        {/* Section Header - stacks vertically on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mb-8 md:mb-16 flex flex-col md:flex-row md:items-start gap-1 md:gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white">
            {topicsDict.title}
          </h2>
          <p className="text-white/80 text-base md:text-2xl font-semibold md:mt-2">
            {topicsDict.subtitle}
          </p>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {topicsDict.items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-4 transition-all duration-300 hover:bg-white group-hover:border-white md:group-hover:scale-[1.03] origin-center">
                <div className="transition-transform duration-300 md:group-hover:scale-[0.97] origin-center">
                  {/* Date & Category Header */}
                  <div className={`bg-white/10 group-hover:bg-[#ED6C00]/10 rounded-md px-3 md:px-4 py-1.5 md:py-2 flex items-center justify-between transition-colors duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-white/90 group-hover:text-[#ED6C00] font-black text-xs md:text-sm transition-colors duration-300">
                      {item.date}
                    </span>
                    <span className="text-white group-hover:text-black text-[10px] md:text-xs font-semibold transition-colors duration-300">
                      {topicsDict.categories[item.category]}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-[3/2] overflow-hidden mt-3 md:mt-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Description */}
                  <div className={`p-2 md:p-3 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="text-white group-hover:text-black font-bold text-sm md:text-lg line-clamp-1 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <button className={`group w-full px-8 py-5 bg-white text-[#ED6C00] font-bold text-xl rounded-xl transition-colors duration-300 flex items-center justify-center relative ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="h-7 overflow-hidden">
              <div className="group-hover:animate-scroll-once">
                <span className="block h-7 leading-7">{topicsDict.viewAll}</span>
                <span className="block h-7 leading-7">{topicsDict.viewAll}</span>
              </div>
            </div>
            <div className={`absolute ${isRTL ? 'left-8' : 'right-8'} flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-px h-8 bg-[#ED6C00]" />
              <svg className={`w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
