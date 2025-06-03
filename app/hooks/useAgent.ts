import { useState, useCallback } from "react";
import { AgentRequest, AgentResponse, ChatMessage } from "../types/api";

// UI-specific message type that extends the API type
interface UIMessage extends Omit<ChatMessage, 'role'> {
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
  id: string;
}

/**
 * Sends a user message to the AgentKit backend API and retrieves the agent's response.
 *
 * @async
 * @function messageAgent
 * @param {string} userMessage - The message sent by the user.
 * @param {ChatMessage[]} history - Optional conversation history for context.
 * @param {string} systemPrompt - Optional system prompt for agent instructions.
 * @returns {Promise<string | null>} The agent's response message or `null` if an error occurs.
 *
 * @throws {Error} Logs an error if the request fails.
 */
async function messageAgent(
  userMessage: string, 
  history?: ChatMessage[], 
  systemPrompt?: string
): Promise<string | null> {
  try {
    const requestBody: AgentRequest = {
      userMessage,
      ...(history && { history }),
      ...(systemPrompt && { systemPrompt }),
    };

    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as AgentResponse;
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.response ?? null;
  } catch (error) {
    console.error("Error communicating with agent:", error);
    throw error; // Re-throw to allow caller to handle
  }
}

/**
 * Converts UI message format to API ChatMessage format
 */
function uiMessageToChatMessage(message: UIMessage): ChatMessage {
  return {
    id: message.id,
    role: message.sender === "user" ? "user" : "assistant",
    content: message.text,
  };
}

/**
 * Generates a unique ID for messages
 */
function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Custom hook for managing interactions with the AI agent.
 * 
 * This hook manages interactions with the AI agent by making REST calls to the backend.
 * It stores the local conversation state, tracking messages sent by the user and
 * responses from the agent with full conversation history support.
 *
 * #### How It Works
 * - `sendMessage(input)` sends a message to `/api/agent` with conversation history and updates state.
 * - `messages` stores the chat history with timestamps and unique IDs.
 * - `isThinking` tracks whether the agent is processing a response.
 * - `clearMessages` allows clearing the conversation history.
 * - `error` tracks any errors that occur during communication.
 *
 * #### Features
 * - Full conversation history sent to API for context
 * - Error handling with user-friendly error states
 * - Message timestamps and unique IDs
 * - Optimistic UI updates with rollback on failure
 * - Support for system prompts
 *
 * #### See Also
 * - The API logic in `/api/agent.ts`
 * - Type definitions in `/types/api.ts`
 *
 * @param {string} [systemPrompt] - Optional system prompt to use for all requests
 * @returns {object} An object containing:
 * - `messages`: The conversation history with UI-specific properties.
 * - `sendMessage`: A function to send a new message.
 * - `isThinking`: Boolean indicating if the agent is processing a response.
 * - `error`: Current error state, if any.
 * - `clearMessages`: Function to clear conversation history.
 * - `clearError`: Function to clear current error.
 */
export function useAgent(systemPrompt?: string) {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sends a user message, updates local state, and retrieves the agent's response.
   *
   * @param {string} input - The message from the user.
   */
  const sendMessage = useCallback(async (input: string) => {
    if (!input.trim() || isThinking) return;

    const userMessage: UIMessage = {
      id: generateMessageId(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
      content: input.trim(),
    };

    // Optimistically add user message
    setMessages(prev => [...prev, userMessage]);
    setIsThinking(true);
    setError(null);

    try {
      // Convert UI messages to API format for history
      const chatHistory = messages.map(uiMessageToChatMessage);
      
      const responseText = await messageAgent(input.trim(), chatHistory, systemPrompt);

      if (responseText) {
        const assistantMessage: UIMessage = {
          id: generateMessageId(),
          text: responseText,
          sender: "assistant",
          timestamp: new Date(),
          content: responseText,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error("No response received from agent");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send message";
      setError(errorMessage);
      
      // Remove the optimistically added user message on error
      setMessages(prev => prev.filter(msg => msg.id !== userMessage.id));
    } finally {
      setIsThinking(false);
    }
  }, [messages, isThinking, systemPrompt]);

  /**
   * Clears all messages from the conversation history.
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  /**
   * Clears the current error state.
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { 
    messages, 
    sendMessage, 
    isThinking, 
    error,
    clearMessages,
    clearError 
  };
}