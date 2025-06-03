"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Coins, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="pt-32 pb-20 relative overflow-hidden font-sans">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-gray-100 to-white dark:from-primary/10 dark:via-transparent dark:to-primary/5" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-10"
                    >
                        <div className="space-y-6">
                            <motion.h1
                                className="text-5xl md:text-8xl font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Meet Your <span className="text-gradient">AI Crypto</span> Sidekick
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-xl text-gray-700 dark:text-muted-foreground leading-relaxed max-w-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Real-time insights. Pay-per-query. Built onchain.
                            </motion.p>
                        </div>

                        <motion.div
                            className="flex flex-row sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link href="/chat" className="cursor-pointer ">
                                <Button size="lg" className="group bg-primary hover:bg-primary/90 glow-effect text-white text-base font-semibold">
                                    Try Demo
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-primary/20 hover:border-primary/40 text-base font-medium"
                            >
                                Connect Wallet
                            </Button>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-3 gap-6 pt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">5%</div>
                                <div className="text-sm text-muted-foreground">Dev Revenue</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">Real-time</div>
                                <div className="text-sm text-muted-foreground">Price Data</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">x402</div>
                                <div className="text-sm text-muted-foreground">Protocol</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Floating Card */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Card className="p-8 border border-primary/10 bg-white dark:bg-card/50 dark:backdrop-blur shadow-md rounded-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-primary/10 rounded-full">
                                        <Bot className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                            AI Crypto Agent
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Always Ready</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-3 bg-primary/5 rounded-lg text-sm text-black dark:text-white font-medium">
                                        &quot;What&apos;s the current price of Bitcoin?&quot;
                                    </div>
                                    <div className="p-3 bg-secondary rounded-lg">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            ₿ $67,234.56 (+2.1%)
                                        </p>
                                        <p className="text-xs text-muted-foreground">Real-time data • Cost: $0.05</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Floating Icons */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -right-4 p-4 bg-primary/10 rounded-full backdrop-blur shadow-md"
                        >
                            <Coins className="h-6 w-6 text-primary" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 p-4 bg-primary/10 rounded-full backdrop-blur shadow-md"
                        >
                            <Zap className="h-6 w-6 text-primary" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
