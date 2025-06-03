"use client";

import { useEffect } from "react";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FeaturesSection } from "@/components/FeatureSection";
import { PricingSection } from "@/components/PricingSection";
import { DemoSection } from "@/components/DemoSection";
import { FAQSection } from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {


  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <FeaturesSection />
          <PricingSection />
          <DemoSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>);
}
