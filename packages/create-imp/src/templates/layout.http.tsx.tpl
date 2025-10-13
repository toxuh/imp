import { type ReactNode } from 'react';
import { type Metadata } from 'next';

import { Roboto } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/components/query-provider';

import './globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })

export const metadata: Metadata = {
  title: 'IMP',
  description: 'Your Next.js starter',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`min-h-screen bg-background text-foreground antialiased ${roboto.className}`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;

