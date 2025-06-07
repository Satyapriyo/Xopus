"use client";

import { useState } from "react";
import {
  createWalletClient,
  custom,
  publicActions,
  type Transport,
} from "viem";
import { base } from "viem/chains";

interface SignerWallet {
  account: { address: string; type: "json-rpc" };
  transport: Transport;
  chain: typeof base;
  signMessage: (args: { message: string }) => Promise<`0x${string}`>;
}

export function usePaymentWallet() {
  const [walletClient, setWalletClient] = useState<SignerWallet | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Please install a Web3 wallet like MetaMask");
    }

    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      const selectedAddress = accounts[0];
      setAddress(selectedAddress);

      const transport = custom(window.ethereum);
      const client = createWalletClient({
        account: selectedAddress as `0x${string}`,
        chain: base,
        transport,
      }).extend(publicActions);

      const signerWallet: SignerWallet = {
        account: { address: selectedAddress, type: "json-rpc" },
        transport,
        chain: base,
        signMessage: async ({ message }) => {
          return client.signMessage({ message });
        },
      };

      setWalletClient(signerWallet);
      setIsConnected(true);
      return signerWallet;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  };

  return {
    walletClient,
    address,
    isConnected,
    connectWallet,
  };
}
