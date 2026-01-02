import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SPCS Dashboard',
    template: '%s | SPCS Dashboard',
  },
  description: 'Stock & Price Controller Service UI',
  keywords: [
    'stock management',
    'price controller',
    'inventory',
    'dashboard',
    'SPCS',
    'mumzworld',
    'microservice',
    'nextjs',
    'shadcn-ui',
    'tailwindcss',
  ],
  authors: [{ name: 'Mumzworld' }],
  creator: 'SPCS Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SPCS Dashboard',
    title: 'SPCS Dashboard',
    description: 'Stock & Price Controller Service UI',
    images: [
      {
        url: '/logo.png',
        alt: 'SPCS Dashboard Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPCS Dashboard',
    description: 'Stock & Price Controller Service UI',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
