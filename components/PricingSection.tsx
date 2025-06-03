"use client";

import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const queryTypes = [
    {
        type: "General Questions",
        price: "$0.05",
        description: "Basic crypto questions, definitions, explanations",
        features: [
            "General crypto knowledge",
            "Market education",
            "Technology explanations",
            "Basic price queries"
        ]
    },
    {
        type: "Real-time Data",
        price: "$0.15",
        description: "Live prices, market data, trending analysis",
        features: [
            "Real-time price data",
            "Market cap rankings",
            "Volume analysis",
            "Trend identification"
        ],
        popular: true
    },
    {
        type: "Advanced Insights",
        price: "$0.25",
        description: "DeFi strategies, yield farming, complex analysis",
        features: [
            "DeFi yield opportunities",
            "Risk analysis",
            "Portfolio suggestions",
            "Meme coin picks"
        ]
    }
];

export function PricingSection() {
    return (
        <section id="pricing" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Pay-Per-Query <span className="text-gradient">Pricing</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                        Transparent microtransactions with x402 protocol. No subscriptions, pay only for what you use.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Info className="h-4 w-4" />
                        <span>5% of each payment automatically goes to the developer</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-primary cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>This revenue sharing model incentivizes developers to create better AI agents</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {queryTypes.map((query, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className={`relative h-full bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 ${query.popular ? 'border-primary/40 ring-2 ring-primary/20' : 'border-primary/20 hover:border-primary/40'
                                }`}>
                                {query.popular && (
                                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                                        Most Popular
                                    </Badge>
                                )}

                                <CardHeader className="text-center pb-4">
                                    <CardTitle className="text-2xl mb-2">{query.type}</CardTitle>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-primary">{query.price}</span>
                                        <span className="text-muted-foreground ml-1">per query</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{query.description}</p>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <ul className="space-y-3 mb-6">
                                        {query.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center gap-3">
                                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        className={`w-full ${query.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                                        variant={query.popular ? 'default' : 'outline'}
                                    >
                                        Try Now
                                    </Button>

                                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                        <div className="text-xs text-muted-foreground text-center">
                                            <div className="flex justify-between">
                                                <span>Query Cost:</span>
                                                <span>{query.price}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Developer Share (5%):</span>
                                                <span>${(parseFloat(query.price.slice(1)) * 0.05).toFixed(3)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Card className="max-w-2xl mx-auto bg-primary/10 border-primary/20">
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-2">No Hidden Fees</h3>
                            <p className="text-muted-foreground text-sm">
                                All transactions are processed onchain with x402 protocol.
                                Gas fees are minimal and transparent. No monthly subscriptions or setup costs.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
