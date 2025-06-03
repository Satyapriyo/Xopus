// lib/agent/create-agent.ts
import { getVercelAITools } from "@coinbase/agentkit-vercel-ai-sdk";
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit";
import OpenAI from "openai";

// Init DeepSeek via OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": "https://yourdomain.com", // Optional, helps OpenRouter ranking
    "X-Title": "YourAppName",
  },
});

type Agent = {
  tools: ReturnType<typeof getVercelAITools>;
  system: string;
  model: typeof openai;
  maxSteps?: number;
};

let agent: Agent;

export async function createAgent(): Promise<Agent> {
  if (agent) return agent;

  const { agentkit, walletProvider } = await prepareAgentkitAndWalletProvider();

  const canUseFaucet = walletProvider.getNetwork().networkId === "base-sepolia";

  const system = `
You are a helpful onchain assistant.
${
  canUseFaucet
    ? "You can request funds from the faucet to perform transactions."
    : "Ask the user to send funds to the smart wallet before performing any actions."
}
`;

  const tools = getVercelAITools(agentkit);

  agent = {
    tools,
    system,
    model: openai,
    maxSteps: 10,
  };

  return agent;
}
