"use client";

import { baseSepolia } from "viem/chains";

export const projectId =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

export const wagmiConfig = {
  chains: [baseSepolia],
  projectId,
  metadata: {
    name: "NewOnchain Agent",
    description: "Your Web3 Application",
    url: "https://your-website.com",
    icons: ["https://your-website.com/favicon.ico"],
  },
};
