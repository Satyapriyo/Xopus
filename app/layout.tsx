"use client";
import '@coinbase/onchainkit/styles.css';
import "./globals.css"
import { useEffect } from "react";

import { Header } from "@/components/Header";

import { ThemeProvider } from "@/components/ThemeProvider";
// import { X402Provider } from '@/components/X402Provider';


import {
  Providers
} from "@/components/walletProvider";
export default function RootLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
  return (
    <html>
      <body>
        <Providers>

          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Header />{children}

          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
