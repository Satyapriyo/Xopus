// lib/models/deepseek.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": "https://yourdomain.com", // Optional for OpenRouter ranking
    "X-Title": "YourAppName", // Optional
  },
});
