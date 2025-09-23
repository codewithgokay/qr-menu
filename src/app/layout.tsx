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
  title: 'Bella Vista - QR Menu',
  description: 'Authentic Italian cuisine with a modern twist - Digital Menu',
  keywords: 'restaurant, menu, italian, food, dining, qr menu',
  authors: [{ name: 'Bella Vista Restaurant' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Bella Vista - QR Menu',
    description: 'Authentic Italian cuisine with a modern twist',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bella Vista - QR Menu',
    description: 'Authentic Italian cuisine with a modern twist',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'QR Menu',
    'msapplication-TileColor': '#6b7280',
    'msapplication-config': '/browserconfig.xml',
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