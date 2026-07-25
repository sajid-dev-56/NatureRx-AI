"use client";

import { Leaf, Sparkles } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
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
          <Link href="/login" className="hidden sm:block text-sm font-semibold hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/chat" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.23)] hover:-translate-y-0.5 transition-all">
            Consult AI
          </Link>
        </div>
      </div>
    </header>
  );
}
