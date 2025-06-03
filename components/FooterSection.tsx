"use client";

import { motion } from "framer-motion";
import { Brain, Twitter, Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <Brain className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">CryptoAgent</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Your AI crypto sidekick for real-time insights, powered by x402 protocol and built for the onchain economy.
                        </p>
                        <div className="flex space-x-3">
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Github className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Mail className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Product */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="font-semibold mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#demo" className="hover:text-primary transition-colors">Demo</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
                        </ul>
                    </motion.div>

                    {/* Developers */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-semibold mb-4">Developers</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Build an Agent</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">x402 Protocol</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Revenue Share</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">SDK</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                        </ul>
                    </motion.div>

                    {/* Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="border-t pt-8 mt-12"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © 2024 CryptoAgent. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Built with</span>
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>by developers, powered by x402</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
