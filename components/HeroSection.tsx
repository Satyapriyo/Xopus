
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Coins, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="md:min-h-[70vh] min-h-screen pt-20 pb-20 md:mt-10 mt-3 relative overflow-hidden">
            {/* Enhanced Background with animated gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/10"
                    animate={{
                        background: [
                            "linear-gradient(45deg, hsl(var(--primary) / 0.05), transparent, hsl(var(--primary) / 0.1))",
                            "linear-gradient(135deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--primary) / 0.05))",
                            "linear-gradient(45deg, hsl(var(--primary) / 0.05), transparent, hsl(var(--primary) / 0.1))"
                        ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
                <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
                    {/* Left Side - Enhanced Typography and Layout */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                                <Zap className="h-4 w-4" />
                                Powered by AI & Blockchain
                            </motion.div>

                            <motion.h1
                                className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Meet Your{" "}
                                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                                    AI Crypto
                                </span>{" "}
                                Sidekick
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Get real-time crypto insights with pay-per-query pricing.
                                Built entirely onchain for maximum transparency and trust.
                            </motion.p>
                        </div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link href="/chat">
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{ x: [-100, 100] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    Chat Now
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                            >
                                <Bot className="mr-2 h-4 w-4" />
                                Try Demo
                            </Button>
                        </motion.div>

                        {/* Enhanced Stats Section */}
                        <motion.div
                            className="grid grid-cols-3 gap-8 pt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            {[
                                { value: "5%", label: "Dev Revenue", icon: Coins },
                                { value: "Real-time", label: "Price Data", icon: Zap },
                                { value: "24/7", label: "Availability", icon: Bot }
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center group"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <stat.icon className="h-5 w-5 text-primary mr-2" />
                                        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {stat.value}
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Enhanced Interactive Demo */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Floating Card */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Card className="p-6 border border-border max-w-2xl bg-card/80 backdrop-blur-sm shadow-2xl">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-4 mb-6">
                                        <motion.div
                                            className="p-3 bg-primary/10 rounded-full"
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Bot className="h-8 w-8 text-primary" />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                AI Crypto Agent
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                <p className="text-sm text-muted-foreground">Online</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <motion.div
                                            className="p-4 bg-muted rounded-lg text-sm font-medium"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1 }}
                                        >
                                            &quot;What&apos;s the current price of Bitcoin?&quot;
                                        </motion.div>
                                        <motion.div
                                            className="p-4 bg-primary/5 rounded-lg border border-primary/10"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.5 }}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-sm font-semibold">
                                                    ₿ $104,234.56
                                                </p>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                                    +2.1%
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Real-time data • Query cost: $0.05
                                            </p>
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Enhanced Floating Elements */}
                        <motion.div
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute -top-6 -right-6 p-4 bg-card/80 backdrop-blur-sm border border-border rounded-full shadow-lg"
                        >
                            <Coins className="h-6 w-6 text-primary" />
                        </motion.div>

                        <motion.div
                            animate={{
                                y: [0, 20, 0],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            className="absolute -bottom-6 -left-6 p-4 bg-card/80 backdrop-blur-sm border border-border rounded-full shadow-lg"
                        >
                            <Zap className="h-6 w-6 text-primary" />
                        </motion.div>

                        {/* Additional floating elements */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 -left-8 w-4 h-4 bg-primary/30 rounded-full"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-1/4 -right-2 w-3 h-3 bg-primary/20 rounded-full"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
