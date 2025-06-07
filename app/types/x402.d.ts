declare module 'x402/dist/types' {
    import { Transport, Account, Chain, Hash } from 'viem';
  
    export interface SignerWallet {
      account: Account;
      chain?: Chain;
      transport: Transport;
      signMessage: (message: { message: string }) => Promise<Hash>;
    }
  
    export interface PaymentRequirements {
      scheme: string;
      network: string;
      maxAmountRequired: string;
      resource: string;
      description: string;
      mimeType: string;
      payTo: string;
      maxTimeoutSeconds: number;
      asset: string;
    }
  }