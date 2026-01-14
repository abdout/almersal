'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PickupItem {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  tag?: string;
  date?: string;
}

interface SidebarItem {
  id: string;
  image: string;
  title: string;
  tag?: string;
  tagColor?: string;
}

interface PickupSectionProps {
  dictionary?: {
    title?: string;
    subtitle?: string;
  };
}

const pickupItems: PickupItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    title: 'رسالة للأهالي',
    subtitle: 'من المحترفين لعشاق الإنتاج - دليل شامل للبدء في عالم الإنتاج الإعلامي',
    tag: 'جديد',
    date: '2025.01.14',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=800&q=80',
    title: 'ورشة التصوير',
    subtitle: 'تعلم أساسيات التصوير الاحترافي مع خبراء المجال',
    tag: 'قريباً',
    date: '2025.01.20',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    title: 'نتائج المسابقة',
    subtitle: 'أفضل الأعمال المشاركة في مسابقة الإنتاج الإعلامي',
    tag: 'نتائج',
    date: '2025.01.10',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    title: 'دورة المونتاج',
    subtitle: 'تعلم أساسيات المونتاج الاحترافي مع خبراء المجال',
    tag: 'تعليم',
    date: '2025.02.05',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    title: 'معرض الأعمال',
    subtitle: 'استعراض أفضل أعمالنا في التصوير والإنتاج',
    tag: 'فعالية',
    date: '2025.02.15',
  },
];

const sidebarItems: SidebarItem[] = [
  {
    id: 's1',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80',
    title: 'دورة المونتاج',
    tag: 'تعليم',
    tagColor: 'bg-purple-500',
  },
  {
    id: 's2',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80',
    title: 'معرض الأعمال',
    tag: 'فعالية',
    tagColor: 'bg-blue-500',
  },
  {
    id: 's3',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&q=80',
    title: 'خدماتنا الجديدة',
    tag: 'إعلان',
    tagColor: 'bg-green-500',
  },
];

export function PickupSection({ dictionary }: PickupSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with center item
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % pickupItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + pickupItems.length) % pickupItems.length);
  };

  // Get visible items (prev, current, next)
  const getVisibleItems = () => {
    const prev = currentIndex === 0 ? pickupItems.length - 1 : currentIndex - 1;
    const next = (currentIndex + 1) % pickupItems.length;
    return [prev, currentIndex, next];
  };

  const [prevIdx, currIdx, nextIdx] = getVisibleItems();

  return (
    <section className="relative py-12 px-4 md:px-8">
      {/* Section Header */}
      <div className="flex items-start justify-between mb-8">
        {/* Title - Left side */}
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {dictionary?.title || 'مواضيع مميزة'}
          </h2>
          <p className="text-lg text-white/70 mt-1">
            {dictionary?.subtitle || 'اختيارات المحررين'}
          </p>
        </div>

        {/* Date - Right side */}
        <div className="text-right">
          <div className="text-sm text-white/60">
            {new Date().toLocaleDateString('ar-SA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        </div>
      </div>

      {/* Main Content - Sidebar + Center-Focus Carousel Layout */}
      <div className="flex gap-6">
        {/* Left Sidebar - Small Cards */}
        <div className="hidden md:flex flex-col gap-4 w-[200px] flex-shrink-0">
          {sidebarItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative rounded-2xl overflow-hidden bg-white/10 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Tag */}
                {item.tag && (
                  <div className="absolute top-2 right-2">
                    <span className={cn('px-2 py-0.5 text-[10px] font-bold text-white rounded-full', item.tagColor || 'bg-primary-500')}>
                      {item.tag}
                    </span>
                  </div>
                )}

                {/* Title */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-sm font-bold text-white">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center-Focus Carousel - Middle item is bigger */}
        <div className="flex-1 relative" ref={scrollRef}>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Previous Item - Smaller */}
            <motion.div
              key={`prev-${prevIdx}`}
              className="hidden md:block w-[180px] lg:w-[220px] flex-shrink-0 cursor-pointer"
              onClick={prevSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 0.6, x: 0 }}
              whileHover={{ opacity: 0.8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white/10">
                <img
                  src={pickupItems[prevIdx].image}
                  alt={pickupItems[prevIdx].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>

            {/* Current/Center Item - Larger */}
            <motion.div
              className="flex-1 max-w-[500px] lg:max-w-[600px]"
              layoutId="centerCard"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-white/10 shadow-2xl"
                >
                  <img
                    src={pickupItems[currIdx].image}
                    alt={pickupItems[currIdx].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Tag */}
                  {pickupItems[currIdx].tag && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white text-primary-500 text-sm font-bold rounded-full">
                        {pickupItems[currIdx].tag}
                      </span>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/30 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {pickupItems[currIdx].date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl md:text-3xl font-black text-white mb-2"
                    >
                      {pickupItems[currIdx].title}
                    </motion.h3>
                    {pickupItems[currIdx].subtitle && (
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm md:text-base text-white/80 max-w-xl"
                      >
                        {pickupItems[currIdx].subtitle}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Next Item - Smaller */}
            <motion.div
              key={`next-${nextIdx}`}
              className="hidden md:block w-[180px] lg:w-[220px] flex-shrink-0 cursor-pointer"
              onClick={nextSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.6, x: 0 }}
              whileHover={{ opacity: 0.8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white/10">
                <img
                  src={pickupItems[nextIdx].image}
                  alt={pickupItems[nextIdx].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors z-10"
            aria-label="السابق"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors z-10"
            aria-label="التالي"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Navigation - Below carousel */}
          <div className="flex justify-center gap-2 mt-6">
            {pickupItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                )}
                aria-label={`الانتقال للشريحة ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Additional content for larger screens */}
        <div className="hidden lg:flex flex-col gap-4 w-[180px] flex-shrink-0">
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-xs text-white/60 mb-2">قادم قريباً</p>
            <p className="text-lg font-bold text-white">ورشة التصوير</p>
            <p className="text-sm text-white/70 mt-1">للمبتدئين</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4">
            <p className="text-xs text-white/60 mb-2">خدمة جديدة</p>
            <p className="text-lg font-bold text-white">إنتاج البودكاست</p>
            <p className="text-sm text-white/70 mt-1">احترافي</p>
          </div>
        </div>
      </div>
    </section>
  );
}
