import type { Metadata } from 'next';
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
  return children;
}
