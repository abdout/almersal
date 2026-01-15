export const i18n = {
  defaultLocale: 'ar',
  locales: ['ar', 'en'],
} as const;

export const locales = i18n.locales;
export type Locale = (typeof i18n)['locales'][number];
export const defaultLocale = i18n.defaultLocale;

// Locale metadata for enhanced functionality
export const localeConfig = {
  'ar': {
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl' as const,
    flag: '🇸🇦',
    dateFormat: 'dd/MM/yyyy',
    currency: 'SAR',
  },
  'en': {
    name: 'English',
    nativeName: 'English',
    dir: 'ltr' as const,
    flag: '🇺🇸',
    dateFormat: 'MM/dd/yyyy',
    currency: 'USD',
  },
} as const;

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return localeConfig[locale]?.dir ?? 'rtl';
}

export function isRTL(locale: Locale): boolean {
  return localeConfig[locale]?.dir === 'rtl';
}

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}

const dictionaries = {
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  try {
    return await (dictionaries[locale]?.() ?? dictionaries[defaultLocale]());
  } catch (error) {
    console.warn(`Failed to load dictionary for locale: ${locale}. Falling back to ${defaultLocale}.`);
    return await dictionaries[defaultLocale]();
  }
};

// Type helper for component props
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
