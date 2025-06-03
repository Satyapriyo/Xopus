"use client";

import "./globals.css"
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { config } from "@/lib/wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ThemeProvider } from "@/components/ThemeProvider";
const queryClient = new QueryClient();

const WalletProviders = dynamic(() => import("@/components/walletProvider"), {
  ssr: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
  return (
    <html>
      <body>
        <WalletProviders>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <Header />{children}
              </ThemeProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </WalletProviders>
      </body>
    </html>
  );
}
