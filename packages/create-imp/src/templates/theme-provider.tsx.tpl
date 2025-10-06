'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export interface Props {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export const ThemeProvider = ({ children, ...props }: Readonly<Props>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
