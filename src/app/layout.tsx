import type { Metadata } from 'next';
import { geistSans, geistMono, notoArabic } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'المرسال للإنتاج الإعلامي | Almersal Media',
  description: 'شركة المرسال للإنتاج الإعلامي - نصنع المحتوى الذي يلهم',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
