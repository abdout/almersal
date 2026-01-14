'use client';

import { motion } from 'framer-motion';

interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
}

const photos: PhotoItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    alt: 'تصوير احترافي',
    size: 'small',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    alt: 'معدات التصوير',
    size: 'small',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    alt: 'فريق العمل',
    size: 'large',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
    alt: 'جلسة تصوير',
    size: 'medium',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1505739998589-00fc191ce01d?w=600&q=80',
    alt: 'إنتاج فيديو',
    size: 'medium',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80',
    alt: 'استوديو',
    size: 'small',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    alt: 'تحرير الفيديو',
    size: 'large',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
    alt: 'كاميرا سينمائية',
    size: 'medium',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80',
    alt: 'إضاءة احترافية',
    size: 'small',
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&q=80',
    alt: 'مونتاج',
    size: 'small',
  },
];

export function PhotoGridSection() {
  return (
    <section className="py-16 bg-background">
      {/* Grid Container */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo, index) => {
            const sizeClasses = {
              small: 'col-span-1 row-span-1',
              medium: 'col-span-1 md:col-span-1 row-span-1 md:row-span-2',
              large: 'col-span-2 row-span-2',
            };

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className={`${sizeClasses[photo.size]} relative overflow-hidden rounded-lg group cursor-pointer`}
              >
                <div className={`relative w-full ${photo.size === 'large' ? 'aspect-[4/3]' : photo.size === 'medium' ? 'aspect-[3/4] md:aspect-[3/5]' : 'aspect-square'}`}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
