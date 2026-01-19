import { Geist, Geist_Mono, Noto_Sans_Arabic, Rubik } from 'next/font/google';

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const notoArabic = Noto_Sans_Arabic({
  variable: '--font-noto-arabic',
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
});

export const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
