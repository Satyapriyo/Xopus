// app/types/api.ts

// Message role types
export type Role = "system" | "user" | "assistant";

// Single chat message
export type ChatMessage = {
  id?: string;
  role: Role;
  content: string;
};

// Request sent to the agent
export type AgentRequest = {
  userMessage: string;
  history?: ChatMessage[]; // Optional for continuity
  systemPrompt?: string; // Optional for system instructions
};

// Response received from the agent
export type AgentResponse = {
  response?: string;
  error?: string;
};
