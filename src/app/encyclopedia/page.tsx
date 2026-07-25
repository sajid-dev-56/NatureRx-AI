"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, Droplet, Sun, Wind, ShieldAlert, TreeDeciduous, Leaf } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FavoriteButton } from "@/components/FavoriteButton";

// Plant Database Mock Data
const MOCK_PLANTS = [
  // Trees
  {
    id: 101,
    name: "Neem",
    scientificName: "Azadirachta indica",
    category: "Tree",
    description: "A medicinal tree widely used in traditional medicine for its antibacterial and antifungal properties.",
    evidenceLevel: "Strong Evidence",
    benefits: ["Treats acne & skin infections", "Improves oral health", "Boosts immunity"],
    precautions: "Prolonged use of neem oil internally is not recommended.",
    icon: <TreeDeciduous className="text-emerald-600 w-8 h-8" />
  },
  {
    id: 102,
    name: "Peepal",
    scientificName: "Ficus religiosa",
    category: "Tree",
    description: "A sacred tree known for its bark, leaves, and fruits which are used to treat various ailments.",
    evidenceLevel: "Traditional Use Only",
    benefits: ["Relieves asthma symptoms", "Heals skin wounds", "Improves digestion"],
    precautions: "Consult an Ayurvedic practitioner for proper dosage.",
    icon: <TreeDeciduous className="text-green-600 w-8 h-8" />
  },
  {
    id: 103,
    name: "Eucalyptus",
    scientificName: "Eucalyptus globulus",
    category: "Tree",
    description: "Known for its fast growth and fragrant oil, widely used to clear respiratory tracts.",
    evidenceLevel: "Strong Evidence",
    benefits: ["Clears nasal congestion", "Soothes cold symptoms", "Reduces pain"],
    precautions: "Eucalyptus oil is highly toxic if ingested directly. Always dilute.",
    icon: <TreeDeciduous className="text-teal-600 w-8 h-8" />
  },
  {
    id: 104,
    name: "Banyan",
    scientificName: "Ficus benghalensis",
    category: "Tree",
    description: "A large, expansive tree whose roots, bark, and leaves are used for oral care and wound healing.",
    evidenceLevel: "Moderate Evidence",
    benefits: ["Strengthens teeth and gums", "Reduces inflammation", "Heals cracked heels"],
    precautions: "Safe for topical use; oral use should be supervised.",
    icon: <TreeDeciduous className="text-emerald-700 w-8 h-8" />
  },
  // Herbs & Plants
  {
    id: 1,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    category: "Herb",
    description: "Known for its soothing and moisturizing properties. Great for sunburns, minor cuts, and acne.",
    evidenceLevel: "Strong Evidence",
    benefits: ["Soothes sunburns", "Reduces acne inflammation", "Moisturizes skin"],
    precautions: "Do not ingest raw aloe latex as it can cause cramps and diarrhea.",
    icon: <Leaf className="text-emerald-500 w-8 h-8" />
  },
  {
    id: 2,
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "Herb",
    description: "Contains curcumin, a powerful anti-inflammatory and antioxidant compound.",
    evidenceLevel: "Strong Evidence",
    benefits: ["Reduces inflammation", "Boosts immunity", "May improve brain function"],
    precautions: "High doses may cause stomach upset or increase bleeding risk.",
    icon: <Sun className="text-amber-500 w-8 h-8" />
  },
  {
    id: 3,
    name: "Peppermint",
    scientificName: "Mentha × piperita",
    category: "Herb",
    description: "Often used to relieve digestive symptoms, such as gas, bloating and indigestion.",
    evidenceLevel: "Moderate Evidence",
    benefits: ["Relieves IBS symptoms", "Eases tension headaches", "Clears sinuses"],
    precautions: "May worsen GERD or acid reflux symptoms in some people.",
    icon: <Wind className="text-teal-500 w-8 h-8" />
  }
];

const CATEGORIES = ["All", "Tree", "Herb"];

export default function Encyclopedia() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPlants = MOCK_PLANTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background relative pt-20">
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-nature-100/50 to-transparent dark:from-nature-900/20 -z-10" />

      {/* Header - Fixed Z-index and background opacity to prevent text overlap */}
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-xl z-50 border-b border-border shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold font-outfit">Plant DB</h1>
          </div>
          <div className="flex items-center gap-4 flex-1 justify-end max-w-md">
            <div className="relative w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search plants, trees, or herbs..."
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
            placeholder="Search plants..."
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
                {cat === "All" ? "All Plants" : cat + "s"}
              </button>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-muted-foreground whitespace-nowrap">Showing {filteredPlants.length} items</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant, i) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border p-6 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary shadow-sm flex items-center justify-center">
                  {plant.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {plant.category}
                  </span>
                  <FavoriteButton id={`plant-${plant.id}`} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold font-outfit mb-1 text-card-foreground">{plant.name}</h3>
              <p className="text-xs text-muted-foreground italic mb-4">{plant.scientificName}</p>
              
              <p className="text-sm text-card-foreground/80 leading-relaxed mb-6">
                {plant.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Benefits</h4>
                  <ul className="space-y-1">
                    {plant.benefits.map((b, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2 text-card-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fixed Text Contrast Issue here */}
                <div className="p-4 rounded-xl bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <ShieldAlert className="w-4 h-4" />
                    Precautions
                  </div>
                  <p className="text-sm font-medium text-amber-950 dark:text-amber-200">
                    {plant.precautions}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No plants found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
}
