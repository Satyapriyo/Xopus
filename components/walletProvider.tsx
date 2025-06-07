'use client';

import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing 

export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia} 
      config={{
        appearance: {
          mode: 'auto',
        },
        paymaster: process.env.PAYMASTER_ENDPOINT,
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}