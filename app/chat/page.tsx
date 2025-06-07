"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useAgent } from "../hooks/useAgent";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Name } from '@coinbase/onchainkit/identity';
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionToastLabel,
  TransactionToast
} from '@coinbase/onchainkit/transaction';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { calls } from '@/calls';
import { Bot, Sparkles, MessageCircle, Zap } from 'lucide-react';

export default function Index() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { messages, sendMessage, isThinking } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [hasSentAfterPayment, setHasSentAfterPayment] = useState(false);
  const [txResetKey, setTxResetKey] = useState(0);

  const { address } = useAccount();

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
        <div className="mt-4 rounded-xl overflow-hidden border border-border/50 bg-[#0f0f0f] shadow-lg">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-border/30">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-300 font-medium ml-2">{match[1]}</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ""))}
              className="text-sm text-gray-300 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-gray-600/50 backdrop-blur-sm"
            >
              Copy
            </button>
          </div>
          <SyntaxHighlighter
            language={match[1]}
            style={vscDarkPlus as any}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.6',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-slate-800/60 text-slate-100 px-2 py-1 rounded-md text-sm font-mono border border-slate-700/50"
          {...props}
        >
          {children}
        </code>
      );
    },
    a: (props: any) => (
      <a
        {...props}
        className="text-blue-400 underline hover:text-blue-300 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
      />
    ),
    blockquote: (props: any) => (
      <blockquote
        {...props}
        className="border-l-4 border-blue-500 bg-blue-500/5 pl-4 py-2 italic text-muted-foreground my-3 rounded-r-lg"
      />
    ),
    h1: (props: any) => (
      <h1 {...props} className="text-2xl font-bold mt-6 mb-3 text-foreground" />
    ),
    h2: (props: any) => (
      <h2 {...props} className="text-xl font-semibold mt-5 mb-3 text-foreground" />
    ),
    h3: (props: any) => (
      <h3 {...props} className="text-lg font-medium mt-4 mb-2 text-foreground" />
    ),
    ul: (props: any) => (
      <ul {...props} className="list-disc list-inside my-3 space-y-2 text-muted-foreground" />
    ),
    ol: (props: any) => (
      <ol {...props} className="list-decimal list-inside my-3 space-y-2 text-muted-foreground" />
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);

    if (status.statusName === 'error') {
      console.error('Transaction error:', status.statusData);
    }

    if (status.statusName === 'init' || status.statusName === 'transactionIdle') {
      setHasSentAfterPayment(false);
    }

    if (status.statusName === 'success' && !hasSentAfterPayment) {
      console.log('Transaction successful:', status.statusData);
      setHasSentAfterPayment(true);
      handleSend();
      setTimeout(() => {
        setTxResetKey(prev => prev + 1);
      }, 2000);
    }
  }, [handleSend, hasSentAfterPayment]);

  const suggestions = [
    "What can you help me with?",
    "Explain quantum computing",
    "Write a Python script",
    "Create a React component"
  ];

  return (
    <div className="min-h-screen h-[100vh] mt-10 bg-gradient-to-br dark:from-slate-900 dark:via-blue-900 dark:to-slate-900 from-slate-300 via-blue-500 to-slate-300 text-foreground flex items-center justify-center p-4">
      <div className="w-full md:w-[95%] lg:w-[85%] max-w-6xl h-[90vh] bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-b border-slate-600/30 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"
                  animate={isThinking ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: isThinking ? Infinity : 0 }}
                />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  AgentKit Chat
                </h1>
                <p className="text-slate-400 flex items-center space-x-2">
                  {isThinking ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span>Agent is thinking...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Ready to assist you</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-slate-700/50 px-3 py-2 rounded-full">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">{messages.length}</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'} shadow-lg`} />
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
              className="bg-red-500/10 border-b border-red-500/20 px-8 py-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-red-400 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>{error}</span>
                </p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300 text-sm px-3 py-1 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center h-full space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="text-8xl"
              >
                🤖
              </motion.div>
              <div className="text-center space-y-3">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                >
                  Welcome to AgentKit
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-slate-400 max-w-md"
                >
                  Your intelligent AI assistant ready to help with coding, explanations, and creative tasks
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full"
              >
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    onClick={() => setInput(suggestion)}
                    className="group px-4 py-3 bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/60 hover:to-slate-500/60 rounded-xl transition-all duration-300 border border-slate-600/30 hover:border-slate-500/50 backdrop-blur-sm"
                  >
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {suggestion}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            messages.map((msg, i) => {
              const isUser = msg.sender === "user";
              const timestamp = msg.timestamp || new Date();

              return (
                <motion.div
                  key={msg.id || i}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`p-5 rounded-2xl whitespace-pre-wrap break-words text-sm leading-relaxed backdrop-blur-sm
                      ${isUser
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md shadow-lg border border-blue-500/30"
                          : "bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-100 rounded-bl-md shadow-lg border border-slate-600/30"
                        }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                    <span className="text-xs text-slate-500 mt-2 px-2">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-300 p-5 rounded-2xl rounded-bl-md shadow-lg border border-slate-600/30 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <span className="text-sm">AI is crafting a response...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-600/30 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm p-6">
          <div className="flex items-end space-x-4">
            <div className="flex-grow relative">
              <textarea
                ref={inputRef}
                className="w-full bg-slate-700/50 text-slate-100 placeholder-slate-400 px-5 py-4 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-700/70 transition-all resize-none min-h-[56px] max-h-32 border border-slate-600/30 backdrop-blur-sm"
                placeholder="Type your message here..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isThinking}
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              {/* {input.trim() && !address && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={handleSend}
                  disabled={isThinking}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 rounded-xl transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              )} */}
            </div>
            <div className="flex items-center space-x-2">
              {address ? (
                <Transaction
                  key={txResetKey}
                  calls={calls}
                  onStatus={handleOnStatus}
                  isSponsored={true}
                >
                  <TransactionButton
                    text="Send"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/30"
                  />
                  <TransactionSponsor />
                  <TransactionStatus>
                    <TransactionStatusLabel />
                    <TransactionStatusAction />
                  </TransactionStatus>
                  <TransactionToast>
                    <TransactionToastLabel />
                  </TransactionToast>
                </Transaction>
              ) : (
                <Wallet>
                  <ConnectWallet className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-500/30 flex items-center space-x-2">
                    <Avatar className="h-5 w-5" />
                    <Name />
                  </ConnectWallet>
                </Wallet>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}