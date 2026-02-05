'use client';

import { InfiniteSlider } from '@/components/atom/infinite-slider';

interface GridItem {
  id: string;
  width: string;
  color: string;
}

const topRowItems: GridItem[] = [
  { id: '1', width: 'w-28', color: '#E8E8E8' },
  { id: '2', width: 'w-40', color: '#D0D0D0' },
  { id: '3', width: 'w-32', color: '#B8B8B8' },
  { id: '4', width: 'w-36', color: '#C8C8C8' },
  { id: '5', width: 'w-28', color: '#A0A0A0' },
];

const bottomRowItems: GridItem[] = [
  { id: '1', width: 'w-32', color: '#686868' },
  { id: '2', width: 'w-28', color: '#989898' },
  { id: '3', width: 'w-40', color: '#E0E0E0' },
  { id: '4', width: 'w-36', color: '#C0C0C0' },
  { id: '5', width: 'w-32', color: '#909090' },
];

export function MobilePhotoGrid() {
  return (
    <div className="flex flex-col gap-3 py-4">
      {/* Row 1: Infinite scroll left */}
      <InfiniteSlider gap={12} speed={80} reverse={false}>
        {topRowItems.map((item) => (
          <div
            key={item.id}
            className={`${item.width} h-36 rounded-lg flex-shrink-0`}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </InfiniteSlider>

      {/* Row 2: Large center image */}
      <div
        className="h-72 rounded-lg bg-[#F5F5F5] mx-auto"
        style={{ width: 'calc(100% - 32px)' }}
      />

      {/* Row 3: Infinite scroll right (opposite direction) */}
      <InfiniteSlider gap={12} speed={80} reverse={true}>
        {bottomRowItems.map((item) => (
          <div
            key={item.id}
            className={`${item.width} h-36 rounded-lg flex-shrink-0`}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
