'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export interface Props extends ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children, ...props }: Readonly<Props>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
