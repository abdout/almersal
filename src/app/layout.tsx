import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Almersal Media Production',
  description: 'Almersal Media Production - We create content that inspires',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
