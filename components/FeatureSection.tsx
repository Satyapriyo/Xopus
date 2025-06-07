"use client";

import { motion } from "framer-motion";
import { Bot, Wallet, TrendingUp, Share2, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: Bot,
        title: "GPT-Style AI Agent",
        description: "Advanced conversational AI trained on crypto data, market trends, and DeFi protocols for accurate insights.",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Wallet,
        title: "x402 + CDP Wallet",
        description: "Seamless onchain payments using x402 protocol with Coinbase CDP Wallet integration for secure transactions.",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        icon: TrendingUp,
        title: "Real-time Crypto Insights",
        description: "Live price data, market analysis, DeFi yield opportunities, and trending meme coin recommendations.",
        gradient: "from-green-500 to-emerald-500"
    },
    {
        icon: Share2,
        title: "Auto Revenue Split",
        description: "5% of every payment automatically goes to the agent developer, creating sustainable incentives.",
        gradient: "from-orange-500 to-red-500"
    },
    {
        icon: Shield,
        title: "Secure & Transparent",
        description: "All transactions are onchain, verifiable, and secured by blockchain technology with no hidden fees.",
        gradient: "from-indigo-500 to-purple-500"
    },
    {
        icon: Zap,
        title: "Instant Responses",
        description: "Get answers in seconds with real-time data processing and optimized query execution.",
        gradient: "from-yellow-500 to-orange-500"
    }
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-8xl mt-10 font-bold mb-4">
                        Powerful <span className="text-gradient">Features</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need for intelligent crypto decision-making with transparent, pay-per-use pricing
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="h-full bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/25">
                                <CardContent className="p-6">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="h-6 w-6 text-white" />
                                    </div>

                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
