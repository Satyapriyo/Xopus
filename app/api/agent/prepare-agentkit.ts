/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AgentKit,
  cdpApiActionProvider,
  erc20ActionProvider,
  pythActionProvider,
  SmartWalletProvider,
  walletActionProvider,
  WalletProvider,
  wethActionProvider,
} from "@coinbase/agentkit";
import { Address, Hex } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

type WalletData = {
  privateKey: Hex;
  smartWalletAddress: Address;
};

export async function prepareAgentkitAndWalletProvider(): Promise<{
  agentkit: AgentKit;
  walletProvider: WalletProvider;
}> {
  const {
    CDP_API_KEY_ID,
    CDP_API_KEY_SECRET,
    PRIVATE_KEY,
    SMART_WALLET_ADDRESS,
    NETWORK_ID,
  } = process.env;

  if (!CDP_API_KEY_ID || !CDP_API_KEY_SECRET) {
    throw new Error(
      "Missing CDP_API_KEY_ID or CDP_API_KEY_SECRET in environment variables."
    );
  }

  if (!PRIVATE_KEY || !SMART_WALLET_ADDRESS) {
    throw new Error(
      "Missing PRIVATE_KEY or SMART_WALLET_ADDRESS in environment variables."
    );
  }

  const privateKey = PRIVATE_KEY as Hex;
  const smartWalletAddress = SMART_WALLET_ADDRESS as Address;

  try {
    const signer = privateKeyToAccount(privateKey);

    const walletProvider = await SmartWalletProvider.configureWithWallet({
      networkId: NETWORK_ID || "base-sepolia",
      signer,
      smartWalletAddress,
      paymasterUrl: undefined,
    });

    const agentkit = await AgentKit.from({
      walletProvider,
      actionProviders: [
        wethActionProvider(),
        pythActionProvider(),
        walletActionProvider(),
        erc20ActionProvider(),
        cdpApiActionProvider({
          apiKeyId: CDP_API_KEY_ID,
          apiKeySecret: CDP_API_KEY_SECRET,
        }),
      ],
    });

    return { agentkit, walletProvider };
  } catch (error) {
    console.error("Error initializing agent:", error);
    throw new Error("Failed to initialize agent");
  }
}
