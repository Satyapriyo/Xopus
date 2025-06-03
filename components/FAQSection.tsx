"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question: "How does the x402 payment protocol work?",
        answer: "x402 is an open payment protocol that enables micropayments for digital services. When you ask a question, a small payment is automatically processed through your connected Coinbase CDP Wallet. The transaction is verified onchain, ensuring transparency and security."
    },
    {
        question: "Is my wallet and data secure?",
        answer: "Yes, security is our top priority. We use Coinbase's CDP Wallet for secure transactions, and all payments are processed onchain. We don't store your private keys or personal data. Your queries are processed in real-time and not permanently stored."
    },
    {
        question: "What happens to the 5% developer share?",
        answer: "5% of each payment automatically goes to the AI agent developer as an incentive for creating and maintaining high-quality agents. This creates a sustainable ecosystem where developers are rewarded for building better AI tools."
    },
    {
        question: "Can I use the agent without connecting a wallet?",
        answer: "You can view the demo and explore features, but you'll need to connect a Coinbase CDP Wallet to ask real questions and receive AI responses. This ensures secure payments and access to real-time data."
    },
    {
        question: "How accurate is the crypto data?",
        answer: "We source real-time data from multiple reliable exchanges and data providers. Our AI is trained on current market information, but remember that crypto markets are highly volatile. Always do your own research before making financial decisions."
    },
    {
        question: "Are there any hidden fees?",
        answer: "No hidden fees! You only pay the displayed query cost plus minimal gas fees for the onchain transaction. The 5% developer share is already included in the quoted price. No subscriptions or setup costs required."
    },
    {
        question: "Can I request custom AI agents?",
        answer: "Yes! Our platform supports multiple AI agents. Developers can create specialized agents for different use cases. Contact us if you're interested in developing your own AI agent and earning from the 5% revenue share model."
    },
    {
        question: "What if I'm not satisfied with an AI response?",
        answer: "If you receive an unsatisfactory response due to a technical error, please contact our support team. We review each case individually and may provide credits for verified issues. However, market predictions and investment advice should be used as guidance only."
    }
];

export function FAQSection() {
    return (
        <section id="faq" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to know about our AI crypto agent and payment system
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="bg-card/50 backdrop-blur border border-primary/20 rounded-lg px-6 hover:border-primary/40 transition-colors"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline py-6">
                                        <span className="font-medium">{faq.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground mb-4">Still have questions?</p>
                    <Button variant="outline" className="border-primary/20 hover:border-primary/40">
                        Contact Support
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
