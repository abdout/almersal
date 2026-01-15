import { locales, getDirection, defaultLocale, localeConfig, type Locale } from '@/lib/i18n';
import { geistSans, geistMono, notoArabic } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : defaultLocale) as Locale;
  const dir = getDirection(lang);
  const config = localeConfig[lang];

  // Use Noto Arabic font for Arabic, Geist for English
  const fontClass = lang === 'ar' ? notoArabic.className : geistSans.className;

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className={cn(
        fontClass,
        geistSans.variable,
        geistMono.variable,
        notoArabic.variable,
        'antialiased'
      )}>
        {children}
      </body>
    </html>
  );
}
