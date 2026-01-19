import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Almersal Media',
  description: 'We create content that inspires',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
