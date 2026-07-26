"use client";

import { Leaf, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity">
          <Leaf className="w-8 h-8 drop-shadow-md" />
          <span className="font-outfit text-foreground">NatureRx <span className="text-primary">AI</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/encyclopedia" className="hover:text-primary transition-colors">Plant DB</Link>
          <Link href="/remedies" className="hover:text-primary transition-colors">Remedies</Link>
          <Link href="/analyze" className="hover:text-primary transition-colors flex items-center gap-1"><Sparkles className="w-4 h-4"/> Scan Plant</Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/chat" className="hidden sm:flex bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all">
            Consult AI
          </Link>
          <button 
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full glass-panel border-b border-border shadow-lg flex flex-col p-4 gap-4"
          >
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#features" className="p-3 hover:bg-muted rounded-xl text-foreground font-medium transition-colors">Features</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/encyclopedia" className="p-3 hover:bg-muted rounded-xl text-foreground font-medium transition-colors">Plant DB</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/remedies" className="p-3 hover:bg-muted rounded-xl text-foreground font-medium transition-colors">Remedies</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/analyze" className="p-3 hover:bg-muted rounded-xl text-foreground font-medium transition-colors flex items-center gap-2"><Sparkles className="w-5 h-5 text-primary"/> Scan Plant</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/chat" className="sm:hidden mt-2 bg-primary text-primary-foreground p-3 rounded-xl text-center font-bold shadow-md hover:opacity-90 transition-opacity">
              Consult AI
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
