import { geistSans, geistMono, notoArabic } from '@/lib/fonts';
import { locales, getDirection, defaultLocale, type Locale } from '@/lib/i18n';

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

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
