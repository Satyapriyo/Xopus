// config/wallet.ts

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, arbitrum, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_WALLET_CONNECT_PROJECT_ID",
  chains: [mainnet, polygon, arbitrum, sepolia],
  ssr: true,
});
