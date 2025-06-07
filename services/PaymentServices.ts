// services/PaymentService.ts
import { WalletClient } from "viem";
import { base } from "viem/chains";

export interface PaymentConfig {
  pricePerQuery: bigint; // Price in wei
  paymentAddress: `0x${string}`; // Your payment receiver address
  chainId: number;
}

export class PaymentService {
  private static instance: PaymentService;
  private config: PaymentConfig;

  private constructor() {
    this.config = {
      pricePerQuery: BigInt(
        process.env.NEXT_PUBLIC_PRICE_PER_QUERY || "1000000000000000"
      ), // 0.001 ETH default
      paymentAddress: (process.env.NEXT_PUBLIC_PAYMENT_ADDRESS ||
        "") as `0x${string}`,
      chainId: base.id, // Using Base chain
    };
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  public getConfig(): PaymentConfig {
    return this.config;
  }

  public async handlePaymentRequired(
    walletClient: WalletClient,
    message: string
  ): Promise<string> {
    try {
      // Create payment transaction
      const txHash = await this.processPayment(walletClient);

      // Create payment proof
      const paymentProof = {
        txHash,
        amount: this.config.pricePerQuery.toString(),
        timestamp: Date.now(),
        message,
        address: walletClient.account?.address,
      };

      // Sign the payment proof
      const paymentHeader = await this.createPaymentHeader(
        walletClient,
        paymentProof
      );

      return paymentHeader;
    } catch (error) {
      console.error("Payment processing failed:", error);
      throw new Error(
        "Payment failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  }

  private async processPayment(walletClient: WalletClient): Promise<string> {
    if (!walletClient.account?.address) {
      throw new Error("Wallet not connected");
    }

    // Send payment transaction
    const txHash = await walletClient.sendTransaction({
      to: this.config.paymentAddress,
      value: this.config.pricePerQuery,
      account: walletClient.account,
      chain: base,
    });

    // Wait for transaction confirmation
    await this.waitForTransaction(txHash);

    return txHash;
  }

  private async waitForTransaction(txHash: string): Promise<void> {
    // Simple polling for transaction confirmation
    // In production, you might want to use a more robust method
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(
          `https://api.basescan.org/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}&apikey=${process.env.NEXT_PUBLIC_BASESCAN_API_KEY}`
        );
        const data = await response.json();

        if (data.result?.status === "1") {
          return; // Transaction confirmed
        }
      } catch (error) {
        console.warn("Error checking transaction status:", error);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      attempts++;
    }

    throw new Error("Transaction confirmation timeout");
  }

  private async createPaymentHeader(
    walletClient: WalletClient,
    paymentProof: any
  ): Promise<string> {
    // Create a signature for the payment proof
    const message = JSON.stringify(paymentProof);

    if (!walletClient.account?.address) {
      throw new Error("Wallet not connected");
    }

    const signature = await walletClient.signMessage({
      message,
      account: walletClient.account,
    });

    // Create payment header with proof and signature
    const paymentHeader = {
      proof: paymentProof,
      signature,
    };

    return btoa(JSON.stringify(paymentHeader));
  }

  public formatPrice(): string {
    const ethAmount = Number(this.config.pricePerQuery) / 1e18;
    return `${ethAmount} ETH`;
  }

  public formatPriceUSD(ethToUsdRate: number): string {
    const ethAmount = Number(this.config.pricePerQuery) / 1e18;
    return `$${(ethAmount * ethToUsdRate).toFixed(2)}`;
  }
}
