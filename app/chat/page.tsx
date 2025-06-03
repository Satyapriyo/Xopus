"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAgent } from "../hooks/useAgent";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";

// import { ChatMessage } from "../types/api";

// interface Message {
//   text: string;
//   sender: 'user' | 'assistant';
//   timestamp: Date;
//   id: string;
// }

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage, isThinking } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Memoized markdown components for performance
  const markdownComponents = useMemo(() => ({
    code({
      inline,
      className,
      children,
      ...props
    }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <div className="mt-3 rounded-lg overflow-hidden border border-border bg-[#1e1e1e]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-border">
            <span className="text-xs text-gray-400 font-medium">{match[1]}</span>
            <button
              onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ""))}
              className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={match[1]}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={vscDarkPlus as any}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              color: '#f8f8f2',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-muted text-white px-1 py-0.5 rounded text-[0.85em] font-mono"
          {...props}
        >
          {children}
        </code>
      );
    },
    a: (props: any) => (
      <a
        {...props}
        className="text-primary underline hover:opacity-80 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      />
    ),
    blockquote: (props: any) => (
      <blockquote
        {...props}
        className="border-l-4 border-primary pl-4 italic text-muted-foreground my-2"
      />
    ),
    h1: (props: any) => (
      <h1 {...props} className="text-2xl font-bold mt-4 mb-2" />
    ),
    h2: (props: any) => (
      <h2 {...props} className="text-xl font-semibold mt-3 mb-2" />
    ),
    h3: (props: any) => (
      <h3 {...props} className="text-lg font-medium mt-2 mb-1" />
    ),
    ul: (props: any) => (
      <ul {...props} className="list-disc list-inside my-2 space-y-1" />
    ),
    ol: (props: any) => (
      <ol {...props} className="list-decimal list-inside my-2 space-y-1" />
    ),
  }), []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isThinking) return;
    
    const message = input.trim();
    setInput("");
    setError(null);
    
    try {
      await sendMessage(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      setInput(message); // Restore the input if sending failed
    }
  }, [input, isThinking, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") {
      setInput("");
    }
  }, [handleSend]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full md:w-[90%] lg:w-[80%] max-w-5xl h-[85vh] bg-card border border-border shadow-xl rounded-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-popover border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">AgentKit Chat</h1>
              <p className="text-sm text-muted-foreground">
                {isThinking ? "Agent is thinking..." : "Ready to chat"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
              <span className="text-xs text-muted-foreground">
                {messages.length} messages
              </span>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-destructive/10 border-b border-destructive/20 px-6 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-destructive">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-destructive hover:text-destructive/80 text-sm underline"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/70 transition-all duration-300">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-6xl">🤖</div>
              <div className="text-center">
                <p className="text-lg font-medium text-muted-foreground">Welcome to AgentKit</p>
                <p className="text-sm text-muted-foreground/80">Start a conversation to get help with anything</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["What can you help me with?", "Explain quantum computing", "Write a Python script"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isUser = msg.sender === "user";
              const timestamp = msg.timestamp || new Date();
              
              return (
                <motion.div
                  key={msg.id || i}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`p-4 rounded-xl whitespace-pre-wrap break-words border text-sm
                      ${isUser
                          ? "bg-primary text-primary-foreground rounded-br-none shadow-sm"
                          : "bg-muted text-muted-foreground rounded-bl-none"
                        }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    <span className="text-xs text-muted-foreground/60 mt-1 px-1">
                      {formatTime(timestamp)}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}

          {isThinking && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-muted text-muted-foreground p-4 rounded-xl rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <motion.div
                      className="w-2 h-2 bg-current rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-current rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-current rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                  <span className="text-sm">Agent is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-popover p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-grow">
              <textarea
                ref={inputRef as any}
                className="w-full bg-muted text-foreground placeholder-muted-foreground px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition resize-none min-h-[44px] max-h-32"
                placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown as any}
                disabled={isThinking}
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '44px',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={isThinking || !input.trim()}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                isThinking || !input.trim()
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:brightness-110 shadow-sm hover:shadow-md"
              }`}
            >
              <span>Send</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>
              {input.length > 0 && `${input.length} characters`}
            </span>
            <span>
              Press Escape to clear
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}