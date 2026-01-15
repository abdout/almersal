import { HomeContent } from '@/components/template/home-content';
import { getDictionary, locales, defaultLocale, type Locale } from '@/lib/i18n';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : defaultLocale) as Locale;
  const dictionary = await getDictionary(lang);

  return <HomeContent dictionary={dictionary} params={{ lang }} />;
}
