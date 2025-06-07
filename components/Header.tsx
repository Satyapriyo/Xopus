"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { WalletConnect } from "./connectWallet";

// Smooth scroll helper
const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const yOffset = -80; // adjust if needed for fixed header
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
        top: y,
        behavior: "smooth",
    });
};

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (id: string) => {
        smoothScrollTo(id);
        setIsMenuOpen(false); // close mobile menu after click
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Brain className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">Xopus</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <button onClick={() => handleNavClick("features")} className="text-foreground/80 hover:text-primary transition-colors">
                            Features
                        </button>
                        <button onClick={() => handleNavClick("pricing")} className="text-foreground/80 hover:text-primary transition-colors">
                            Pricing
                        </button>
                        <button onClick={() => handleNavClick("demo")} className="text-foreground/80 hover:text-primary transition-colors">
                            Demo
                        </button>
                        <button onClick={() => handleNavClick("faq")} className="text-foreground/80 hover:text-primary transition-colors">
                            FAQ
                        </button>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <WalletConnect  />
                        <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-4 pb-4 border-t pt-4"
                    >
                        <div className="flex flex-col space-y-4">
                            <button onClick={() => handleNavClick("features")} className="text-left text-foreground/80 hover:text-primary transition-colors">
                                Features
                            </button>
                            <button onClick={() => handleNavClick("pricing")} className="text-left text-foreground/80 hover:text-primary transition-colors">
                                Pricing
                            </button>
                            <button onClick={() => handleNavClick("demo")} className="text-left text-foreground/80 hover:text-primary transition-colors">
                                Demo
                            </button>
                            <button onClick={() => handleNavClick("faq")} className="text-left text-foreground/80 hover:text-primary transition-colors">
                                FAQ
                            </button>
                            {/* <Button variant="outline" className="w-full">
                                Connect Wallet
                            </Button> */}
                            <WalletConnect />
                        </div>
                    </motion.nav>
                )}
            </div>
        </motion.header>
    );
}
