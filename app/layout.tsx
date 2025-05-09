import { Toaster } from '@/components/ui/sonner';
import { TestTubeDiagonalIcon } from 'lucide-react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { NavLinks } from '@/components/nav-links';
import Link from 'next/link';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Learn Automated Testing',
    default: 'Learn Automated Testing', // a default is required when creating a template
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container max-w-screen-lg h-screen px-4 mx-auto flex flex-col">
          <header className="py-4 lg:py-6 border-b flex flex-col gap-4 lg:flex-row lg:items-center">
            <Link
              href="/"
              data-testid="home-link"
              className="font-semibold flex items-center gap-2"
            >
              <TestTubeDiagonalIcon className="size-5 text-primary" />
              <p data-testid="app-title">Learn Automated Testing</p>
            </Link>
            <NavLinks />
          </header>
          <main className="flex-1 py-8">{children}</main>
          <footer className="py-6 border-t">
            <p>Made by Jeff Segovia.</p>
          </footer>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
