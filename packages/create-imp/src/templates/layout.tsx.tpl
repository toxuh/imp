import type { ReactNode } from 'react';

import { Roboto } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`min-h-screen bg-background text-foreground antialiased ${roboto.className}`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
