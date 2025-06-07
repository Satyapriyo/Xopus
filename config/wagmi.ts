"use client";

import { http } from 'viem';
import { createConfig, WagmiProvider } from 'wagmi';
import { baseSepolia } from 'viem/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

const metadata = {
  name: 'NewOnchain Agent',
  description: 'Your Web3 Application',
  url: 'https://your-website.com', // Update with your website
  icons: ['https://your-website.com/favicon.ico'] // Update with your favicon
};

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors: [
    injected(),
    coinbaseWallet({ 
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
    walletConnect({ 
      projectId,
      metadata,
    }),
  ],
});

export const queryClient = new QueryClient();