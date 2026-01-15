'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Locale, Dictionary } from '@/lib/i18n';

interface CTASectionProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function CTASection({ lang, dictionary }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {dictionary.cta.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            {dictionary.cta.subtitle}
          </p>
          <Link href={`/${lang}/contact`}>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full font-bold"
            >
              {dictionary.cta.button}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
