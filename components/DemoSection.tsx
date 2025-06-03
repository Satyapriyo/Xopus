"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Bot, User, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Better type structure
const demoData = [
    {
        query: "What's the current price of Bitcoin?",
        response: "₿ Bitcoin is currently trading at $67,234.56 (+2.1% in 24h). Market cap: $1.32T. The recent uptrend is driven by institutional adoption and ETF inflows.",
        cost: "$0.15"
    },
    {
        query: "What are the top 3 meme coins today?",
        response: "🚀 Top meme coins by 24h performance:\n1. PEPE: +15.3%\n2. SHIB: +8.7%\n3. DOGE: +5.2%\n\nPEPE is trending due to new exchange listings.",
        cost: "$0.25"
    },
    {
        query: "Explain DeFi yield farming",
        response: "DeFi yield farming involves providing liquidity to protocols in exchange for rewards. You deposit tokens into liquidity pools and earn fees + governance tokens. Popular platforms include Uniswap, Aave, and Compound.",
        cost: "$0.05"
    },
    {
        query: "Best staking opportunities right now?",
        response: "🔥 Top staking opportunities:\n• ETH 2.0: ~4.5% APR\n• Solana: ~7.1% APR\n• Cardano: ~4.8% APR\n• Polygon: ~12.3% APR\n\nConsider risk vs reward for each option.",
        cost: "$0.25"
    }
];

// type DemoItem = typeof demoData[0];

export function DemoSection() {
    const [selectedQuery, setSelectedQuery] = useState<string>("");
    const [showResponse, setShowResponse] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const handleQuerySelect = (query: string) => {
        setSelectedQuery(query);
        setShowResponse(false);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setShowResponse(true);
        }, 1500);
    };

    const selectedDemoItem = demoData.find(item => item.query === selectedQuery);

    return (
        <section id="demo" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Try the <span className="text-gradient">Demo</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Experience the AI agent in action. Click any sample query to see how it works.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Query Selection */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-card/50 backdrop-blur border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        Sample Queries
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {demoData.map((item, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleQuerySelect(item.query)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full text-left p-4 rounded-lg border transition-all ${selectedQuery === item.query
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border hover:border-primary/40 hover:bg-muted/50'
                                                }`}
                                        >
                                            <p className="text-sm">{item.query}</p>
                                        </motion.button>
                                    ))}

                                    <div className="pt-4 border-t">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Or type your own question..."
                                                className="flex-1"
                                            />
                                            <Button size="icon" variant="outline">
                                                <Send className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* AI Response */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-card/50 backdrop-blur border-primary/20 h-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bot className="h-5 w-5 text-primary" />
                                        AI Agent Response
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-full flex flex-col">
                                    {!selectedQuery && (
                                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                                            <p>Select a query to see the AI agent in action</p>
                                        </div>
                                    )}

                                    {selectedQuery && (
                                        <div className="space-y-4">
                                            <div className="p-3 bg-muted/50 rounded-lg">
                                                <p className="text-sm font-medium">Your Query:</p>
                                                <p className="text-sm text-muted-foreground">{selectedQuery}</p>
                                            </div>

                                            {isTyping && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <Bot className="h-4 w-4" />
                                                    <span className="text-sm">AI is thinking...</span>
                                                    <div className="flex gap-1">
                                                        <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                                                        <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-100" />
                                                        <div className="w-1 h-1 bg-current rounded-full animate-pulse delay-200" />
                                                    </div>
                                                </div>
                                            )}

                                            {showResponse && selectedDemoItem && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="space-y-4"
                                                >
                                                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                                                        <p className="text-sm whitespace-pre-line">
                                                            {selectedDemoItem.response}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                                        <div className="flex items-center gap-2">
                                                            <Coins className="h-4 w-4 text-primary" />
                                                            <span className="text-sm">Query Cost: {selectedDemoItem.cost}</span>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            Dev share: ${(parseFloat(selectedDemoItem.cost.slice(1)) * 0.05).toFixed(3)}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-center mt-12"
                    >
                        <Button size="lg" className="bg-primary hover:bg-primary/90 glow-effect">
                            Connect Wallet to Start
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                            Connect your Coinbase CDP Wallet to start using the AI agent
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}