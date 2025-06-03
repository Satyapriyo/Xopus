"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemeProviderProps } from "next-themes";

interface ThemeProviderProps extends Omit<NextThemeProviderProps, 'attribute'> {
    children: React.ReactNode;
    attribute?: NextThemeProviderProps['attribute'];
    defaultTheme?: string;
    enableSystem?: boolean;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}