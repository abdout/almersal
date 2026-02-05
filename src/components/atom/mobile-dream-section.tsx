'use client';

import type { Dictionary } from '@/lib/i18n';

interface MobileDreamSectionProps {
  dictionary: Dictionary;
}

export function MobileDreamSection({ dictionary }: MobileDreamSectionProps) {
  const dreamDict = dictionary.dream as {
    title: string;
    subtitle: string;
    tags: Record<string, string>;
  };

  const tagKeys = Object.keys(dreamDict.tags);

  return (
    <section className="py-12 px-4 bg-background overflow-hidden">
      {/* Title Block */}
      <div className="mb-8">
        {/* FIND */}
        <h2 className="text-[19vw] font-bold text-[#ED6C00] leading-[0.9]">
          FIND
        </h2>

        {/* YOUR (vertical) + DREAM row */}
        <div className="flex items-center justify-end">
          {/* YOUR - Vertical text beside DREAM */}
          <span
            className="text-[4vw] font-extrabold text-[#ED6C00] tracking-[0.15em]"
            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            YOUR
          </span>
          {/* DREAM */}
          <h2 className="text-[19vw] font-bold text-[#ED6C00] leading-[0.9] -ml-1">
            DREAM
          </h2>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-xl font-bold text-foreground mb-8">
        {dreamDict.subtitle}
      </p>

      {/* Tags Grid */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tagKeys.map((tagKey) => (
          <button
            key={tagKey}
            className="px-4 py-2.5 rounded-full border border-gray-300 text-sm text-foreground bg-transparent hover:bg-gray-50 transition-colors"
          >
            #{dreamDict.tags[tagKey]}
          </button>
        ))}
      </div>

    </section>
  );
}
