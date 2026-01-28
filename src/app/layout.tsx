import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Republic Pub - Social House',
  description: 'Çanakkale\'nin en iyi pub deneyimi. Özel içecekler, lezzetli atıştırmalıklar ve harika atmosfer.',
  keywords: 'republic, canakkale, pub, bar, restaurant, menu, food, dining, qr menu, republic pub',
  authors: [{ name: 'Republic Pub' }],
  openGraph: {
    title: 'Republic Pub - Social House',
    description: 'Çanakkale\'nin en iyi pub deneyimi. QR Menü ve sipariş sistemi.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Republic Pub - Social House',
    description: 'Çanakkale\'nin en iyi pub deneyimi. QR Menü ve sipariş sistemi.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable}`}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}