"use client";

import { motion } from "framer-motion";
import { MessageSquare, CreditCard, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
    {
        icon: MessageSquare,
        title: "Ask a Question",
        description: "Ask anything crypto-related - prices, DeFi insights, meme coin picks, or general questions.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: CreditCard,
        title: "Pay via x402",
        description: "Secure microtransactions using x402 protocol with your Coinbase CDP Wallet.",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: Users,
        title: "5% to Developer",
        description: "Automatically splits 5% of each payment to the agent developer - supporting the ecosystem.",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: Zap,
        title: "Get Real-time Answer",
        description: "Receive instant, accurate insights powered by AI and real-time blockchain data.",
        color: "from-orange-500 to-red-500"
    }
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        How It <span className="text-gradient">Works</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Four simple steps to get real-time crypto insights with transparent, onchain payments
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative"
                        >
                            <Card className="h-full bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                                <CardContent className="p-6 text-center">
                                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${step.color} mb-4 group-hover:scale-110 transition-transform`}>
                                        <step.icon className="h-6 w-6 text-white" />
                                    </div>

                                    <div className="absolute top-4 right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                                        {index + 1}
                                    </div>

                                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Connection Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
