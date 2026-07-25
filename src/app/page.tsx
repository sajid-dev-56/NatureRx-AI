"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Heart, Sparkles, ArrowRight, Activity, Search } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-400/20 dark:bg-emerald-900/30 blur-[120px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-nature-300/20 dark:bg-nature-800/20 blur-[150px] rounded-full z-0 pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 flex-grow flex items-center justify-center z-10">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 text-nature-700 dark:text-nature-300 text-sm font-bold mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Smarter, Safer Natural Healing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl text-foreground font-outfit"
          >
            Wellness Powered by <br className="hidden md:block" />
            <span className="text-gradient">Nature & Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed font-medium"
          >
            Discover evidence-based organic remedies. Backed by scientific research, powered by AI, and designed for your holistic health journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/chat"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-foreground text-background px-8 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-xl transition-all hover:scale-105"
            >
              Analyze My Symptoms
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/encyclopedia"
              className="w-full sm:w-auto flex items-center justify-center gap-2 glass-panel text-foreground px-8 py-5 rounded-full text-lg font-bold hover:bg-white/40 dark:hover:bg-black/40 transition-all hover:scale-105"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
              Explore Remedies
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10 text-primary" />}
              title="Evidence-Based"
              description="Every recommendation is cross-referenced with trusted sources like PubMed and NIH to ensure absolute safety."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Heart className="w-10 h-10 text-rose-500" />}
              title="Personalized Care"
              description="We tailor wellness plans to your specific age, allergies, and lifestyle for the most effective results."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Activity className="w-10 h-10 text-blue-500" />}
              title="Progress Tracking"
              description="Monitor your healing journey. Log daily symptoms, upload photos, and visually track your improvements."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay }}
      className="glass-panel p-10 rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 font-outfit text-foreground">{title}</h3>
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    </motion.div>
  );
}
