'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import type { Locale, Dictionary } from '@/lib/i18n';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  category: 'clients' | 'alumni' | 'partners';
  quote: string;
  emojis: string[];
}

interface InterviewSectionProps {
  lang: Locale;
  dictionary: Dictionary;
}

// Avatar placeholder images from Unsplash
const avatarImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
];

export function InterviewSection({ lang, dictionary }: InterviewSectionProps) {
  const isRTL = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<'clients' | 'alumni' | 'partners'>('clients');
  const [currentIndex, setCurrentIndex] = useState(0);

  const interviewDict = dictionary.interview as {
    title: string;
    subtitle: string;
    description: string;
    watermark: string;
    categories: {
      clients: string;
      alumni: string;
      partners: string;
    };
    testimonials: Testimonial[];
  };

  const categories = ['clients', 'alumni', 'partners'] as const;

  const filteredTestimonials = interviewDict.testimonials.filter(
    (t) => t.category === activeCategory
  );

  const handleCategoryChange = (category: typeof categories[number]) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  const handleNavigate = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'down' && currentIndex < filteredTestimonials.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Get avatar image for testimonial
  const getAvatarImage = (index: number) => {
    return avatarImages[index % avatarImages.length];
  };

  // Show all testimonials (scrollable)
  const visibleTestimonials = filteredTestimonials;

  return (
    <section className="relative py-20 md:py-32 bg-[#ED6C00] overflow-hidden">
      {/* Background Watermark - Top */}
      <div className="absolute top-8 left-0 right-0 pointer-events-none overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex shrink-0">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className={`text-[14vw] md:text-[11vw] font-bold text-[#FFB84D]/30 whitespace-nowrap mx-8 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}
              >
                {interviewDict.watermark} ALMERSAL
              </span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0" aria-hidden="true">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className={`text-[14vw] md:text-[11vw] font-bold text-[#FFB84D]/30 whitespace-nowrap mx-8 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}
              >
                {interviewDict.watermark} ALMERSAL
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Background Watermark - Bottom */}
      <div className="absolute bottom-8 left-0 right-0 pointer-events-none overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex shrink-0">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className={`text-[14vw] md:text-[11vw] font-bold text-[#FFB84D]/30 whitespace-nowrap mx-8 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}
              >
                {interviewDict.watermark} ALMERSAL
              </span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0" aria-hidden="true">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className={`text-[14vw] md:text-[11vw] font-bold text-[#FFB84D]/30 whitespace-nowrap mx-8 ${isRTL ? 'tracking-normal' : 'tracking-widest'}`}
              >
                {interviewDict.watermark} ALMERSAL
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className={`flex items-stretch gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Left Side - Title, Subtitle, Description (vertically centered) */}
            <div className={`flex flex-col justify-center max-w-xs ${isRTL ? 'text-left' : 'text-right'}`}>
              {/* Title */}
              <h2 className={`text-5xl md:text-6xl font-black text-white tracking-wide mb-1 ${isRTL ? 'self-start' : 'self-end'}`}>
                {interviewDict.title}
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-xl md:text-2xl font-medium mb-4">
                {interviewDict.subtitle}
              </p>

              {/* Description */}
              <p className={`text-white/70 text-sm md:text-base leading-relaxed max-w-[220px] ${isRTL ? 'text-left self-start' : 'text-right self-end'}`}>
                {interviewDict.description}
              </p>
            </div>

            {/* Center + Right - White Container and Tabs */}
            <div className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* White Container with Testimonials */}
            <div className="bg-white rounded-3xl p-6 shadow-xl h-[700px] w-full max-w-lg flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {/* Testimonials List */}
              <div className="flex-1 space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {visibleTestimonials.map((testimonial, index) => {
                      const globalIndex = currentIndex + index;
                      const isEven = globalIndex % 2 === 1;

                      return (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className={`flex items-start gap-4 ${
                            isRTL
                              ? (isEven ? 'flex-row' : 'flex-row-reverse')
                              : (isEven ? 'flex-row-reverse' : 'flex-row')
                          }`}
                        >
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                              <Image
                                src={getAvatarImage(globalIndex)}
                                alt={testimonial.name}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className={`flex-1 ${
                            isRTL
                              ? (isEven ? 'text-left' : 'text-right')
                              : (isEven ? 'text-right' : 'text-left')
                          }`}>
                            {/* Name and Role */}
                            <div className="mb-2">
                              <h4 className="font-bold text-[#ED6C00] text-base">
                                {testimonial.name}
                              </h4>
                              <p className="text-muted-foreground text-sm">
                                {testimonial.role} <span className="text-muted-foreground/50">|</span> {testimonial.company}
                              </p>
                            </div>

                            {/* Quote Bubble */}
                            <div className={`inline-block bg-gray-50 rounded-2xl p-4 max-w-[90%] ${
                              isRTL
                                ? (isEven ? 'rounded-tl-sm' : 'rounded-tr-sm')
                                : (isEven ? 'rounded-tr-sm' : 'rounded-tl-sm')
                            }`}>
                              <p className="text-foreground text-sm leading-relaxed">
                                {testimonial.quote}
                              </p>
                              {/* Emojis */}
                              <div className={`flex gap-2 mt-2 ${
                                isRTL
                                  ? (isEven ? 'justify-start' : 'justify-end')
                                  : (isEven ? 'justify-end' : 'justify-start')
                              }`}>
                                {testimonial.emojis.map((emoji, i) => (
                                  <span key={i} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-base shadow-sm">{emoji}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side - Category Tabs + Arrows */}
            <div className={`flex flex-col ${isRTL ? 'order-first' : ''}`}>
              {/* Spacer to push buttons down */}
              <div className="min-h-[100px]" />

              {/* Category Tabs */}
              <div className="flex flex-col gap-2">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`
                      px-5 py-3 h-20 transition-all duration-300
                      writing-mode-vertical text-sm font-medium
                      rounded-r-md rounded-l-none
                      flex items-center justify-center
                      ${activeCategory === category
                        ? 'bg-white text-[#ED6C00]'
                        : 'bg-transparent text-white border border-white/50 border-l-0 hover:border-white'
                      }
                    `}
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {interviewDict.categories[category]}
                  </button>
                ))}
              </div>

              {/* Navigation Arrows - Below buttons, in column */}
              <div className="flex flex-col gap-1 mt-28 items-end">
                <button
                  onClick={() => handleNavigate('up')}
                  className={`
                    w-8 h-12 rounded-t-md rounded-b-none
                    flex items-center justify-center transition-all duration-300
                    bg-white/20 text-white/40
                  `}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleNavigate('down')}
                  className={`
                    w-8 h-12 rounded-b-md rounded-t-none
                    flex items-center justify-center transition-all duration-300
                    bg-white text-[#ED6C00] hover:bg-white/90
                  `}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
