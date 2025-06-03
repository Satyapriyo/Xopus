// app/api/agent/route.ts
import { AgentRequest, AgentResponse } from "@/app/types/api";
import { NextResponse } from "next/server";
import { createAgent } from "./create-agent";
import { Message, generateId } from "ai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const messages: Message[] = [];

export async function POST(
  req: Request & { json: () => Promise<AgentRequest> }
): Promise<NextResponse<AgentResponse>> {
  try {
    const { userMessage } = await req.json();

    const { model, system } = await createAgent();

    // Push user message
    messages.push({ id: generateId(), role: "user", content: userMessage });

    // Build the full prompt message list
    const chatMessages: ChatCompletionMessageParam[] = [
      { role: "system", content: system },
      ...messages.map(({ role, content }) => ({
        role: role as "system" | "user" | "assistant",
        content,
      })),
    ];

    // Call OpenRouter (DeepSeek)
    const completion = await model.chat.completions.create({
      model: "deepseek/deepseek-chat:free",
      messages: chatMessages,
    });

    const text = completion.choices[0].message.content ?? "";

    // Save assistant response
    messages.push({ id: generateId(), role: "assistant", content: text });

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error in /api/agent:", error);
    return NextResponse.json({
      error:
        error instanceof Error
          ? error.message
          : "Unexpected error occurred. Please try again.",
    });
  }
}
