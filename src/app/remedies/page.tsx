"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Droplet, Sun, Wind, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FavoriteButton } from "@/components/FavoriteButton";

// Remedies Mock Data
const MOCK_REMEDIES = [
  {
    id: 1,
    title: "Ginger & Honey Tea",
    target: "Cold & Cough",
    ingredients: ["1 inch fresh ginger (crushed)", "1 tbsp honey", "1 cup warm water"],
    instructions: "Boil the crushed ginger in water for 5 minutes. Strain into a cup, let it cool slightly, and stir in the honey. Drink twice daily.",
    evidenceLevel: "Strong Evidence",
    icon: <Sun className="text-orange-500 w-8 h-8" />
  },
  {
    id: 2,
    title: "Soothing Aloe Mask",
    target: "Sunburn & Acne",
    ingredients: ["2 tbsp fresh aloe vera gel", "1 tsp turmeric powder"],
    instructions: "Mix the ingredients into a smooth paste. Apply to the affected skin and leave for 15 minutes before rinsing with cool water.",
    evidenceLevel: "Strong Evidence",
    icon: <Droplet className="text-emerald-500 w-8 h-8" />
  },
  {
    id: 3,
    title: "Peppermint Steam",
    target: "Sinus Congestion",
    ingredients: ["Hot water in a bowl", "3-5 drops of peppermint essential oil or fresh leaves"],
    instructions: "Add peppermint to the hot water. Lean over the bowl, cover your head with a towel to trap the steam, and breathe deeply for 5-10 minutes.",
    evidenceLevel: "Moderate Evidence",
    icon: <Wind className="text-teal-500 w-8 h-8" />
  },
  {
    id: 4,
    title: "Neem Oil Scalp Treatment",
    target: "Dandruff",
    ingredients: ["1 tsp pure neem oil", "2 tbsp coconut oil (carrier)"],
    instructions: "Warm the coconut oil slightly and mix in the neem oil. Massage into the scalp and leave for 30-60 minutes before washing with a mild shampoo.",
    evidenceLevel: "Strong Evidence",
    icon: <Droplet className="text-green-700 w-8 h-8" />
  },
  {
    id: 5,
    title: "Chamomile Sleep Brew",
    target: "Insomnia & Stress",
    ingredients: ["1 tbsp dried chamomile flowers", "1 cup boiling water"],
    instructions: "Steep the chamomile in boiling water for 5-10 minutes. Strain and drink 30 minutes before bedtime.",
    evidenceLevel: "Moderate Evidence",
    icon: <Sun className="text-yellow-500 w-8 h-8" />
  }
];

const CATEGORIES = ["All", "Cold & Cough", "Skin Care", "Digestion", "Stress & Sleep"];

export default function Remedies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredRemedies = MOCK_REMEDIES.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || r.target.includes(activeCategory.split(" ")[0]); // simple matching
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background relative pt-20">
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/20 -z-10" />

      {/* Header */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-xl z-50 border-b border-border shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold font-outfit">Remedies</h1>
          </div>
          <div className="flex items-center gap-4 flex-1 justify-end max-w-md">
            <div className="relative w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search recipes, ingredients, or conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white dark:bg-black border border-border rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search remedies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-border rounded-full pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-muted-foreground whitespace-nowrap">Showing {filteredRemedies.length} recipes</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredRemedies.map((remedy, i) => (
            <motion.div
              key={remedy.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border p-8 rounded-3xl hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary shadow-sm flex items-center justify-center">
                  {remedy.icon}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {remedy.target}
                    </span>
                    <FavoriteButton id={`remedy-${remedy.id}`} />
                  </div>
                  <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {remedy.evidenceLevel}
                  </span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold font-outfit mb-6 text-card-foreground">{remedy.title}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2">Ingredients</h4>
                  <ul className="space-y-2">
                    {remedy.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2">Instructions</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {remedy.instructions}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredRemedies.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No recipes found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
