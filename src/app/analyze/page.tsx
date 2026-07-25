"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Sparkles, Activity, AlertTriangle, CheckCircle2, Leaf, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";

type AppState = "idle" | "scanning" | "results";

interface AnalysisResult {
  name: string;
  confidence: number;
  benefits: string[];
  precautions: string[];
  healthStatus: "Healthy" | "Diseased" | "Needs Attention";
  diseaseDetails?: string;
}

export default function AnalyzePage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Mock Result
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    // Convert file to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      startAnalysis(base64);
    };
  };

  const startAnalysis = async (imageBase64: string) => {
    setAppState("scanning");
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });
      
      if (!res.ok) throw new Error("Failed to analyze image");
      
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({
        name: "Analysis Failed",
        confidence: 0,
        benefits: ["Could not retrieve data."],
        precautions: ["Please try again later."],
        healthStatus: "Needs Attention",
        diseaseDetails: "There was an error communicating with the AI backend."
      });
    } finally {
      setAppState("results");
    }
  };

  const resetAnalysis = () => {
    setAppState("idle");
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <>
      <Navbar />
      
      {/* Abstract Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-400/10 dark:bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-nature-300/10 dark:bg-nature-800/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 flex-grow pt-28 pb-12 px-6 flex flex-col items-center min-h-screen">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4 tracking-tight">
            AI Plant <span className="text-primary">Analyzer</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload a photo of any plant or herb. Our AI will identify it, explain its medicinal benefits, and analyze its health.
          </p>
        </div>

        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            
            {/* IDLE STATE: Upload Area */}
            {appState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full"
              >
                <label 
                  className={`
                    flex flex-col items-center justify-center w-full h-80 
                    border-2 border-dashed rounded-3xl cursor-pointer 
                    transition-all duration-300 glass-panel
                    ${isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:bg-black/5 dark:hover:bg-white/5"}
                  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-20 h-20 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <UploadCloud className="w-10 h-10 text-primary" />
                    </div>
                    <p className="mb-2 text-xl font-bold font-outfit text-foreground">
                      <span className="text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      SVG, PNG, JPG or WEBP (MAX. 800x400px)
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </motion.div>
            )}

            {/* SCANNING STATE */}
            {appState === "scanning" && selectedImage && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col items-center"
              >
                <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl glass-panel border border-white/20">
                  <img 
                    src={selectedImage} 
                    alt="Scanning target" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay Dimmer */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Laser Scanner Animation */}
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_3px_rgba(34,197,94,0.7)]"
                    animate={{
                      top: ["0%", "100%", "0%"]
                    }}
                    transition={{
                      duration: 3,
                      ease: "linear",
                      repeat: Infinity
                    }}
                  />

                  {/* Corner Target Marks */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary rounded-br-lg" />

                  {/* Scanning Text */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    <p className="text-white font-bold font-outfit tracking-widest uppercase text-sm animate-pulse">
                      Analyzing Plant Genetics...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* RESULTS STATE */}
            {appState === "results" && result && selectedImage && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Image Thumbnail */}
                  <div className="w-full md:w-1/3 flex-shrink-0">
                    <div className="aspect-square rounded-3xl overflow-hidden glass-panel border border-border shadow-md">
                      <img src={selectedImage} alt="Analyzed Plant" className="w-full h-full object-cover" />
                    </div>
                    <button 
                      onClick={resetAnalysis}
                      className="w-full mt-4 py-3 rounded-xl border-2 border-border hover:bg-secondary font-bold transition-colors"
                    >
                      Scan Another Plant
                    </button>
                  </div>

                  {/* Results Details */}
                  <div className="w-full md:w-2/3 space-y-6">
                    {/* Header */}
                    <div className="glass-panel p-6 rounded-3xl border border-border shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-primary tracking-wider uppercase">Identification Match</span>
                      </div>
                      <h2 className="text-3xl font-bold font-outfit mb-2">{result.name}</h2>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-grow bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${result.confidence}%` }} 
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-primary" 
                          />
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">{result.confidence}% Confidence</span>
                      </div>
                    </div>

                    {/* Grid for Benefits & Health */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Health Analysis */}
                      <div className="glass-panel p-6 rounded-3xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <Activity className="w-5 h-5 text-blue-500" />
                          <h3 className="font-bold text-lg font-outfit">Health Check</h3>
                        </div>
                        <div className={`
                          inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-3
                          ${result.healthStatus === "Healthy" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                            result.healthStatus === "Needs Attention" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : 
                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}
                        `}>
                          {result.healthStatus === "Healthy" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          {result.healthStatus}
                        </div>
                        {result.diseaseDetails && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {result.diseaseDetails}
                          </p>
                        )}
                      </div>

                      {/* Benefits */}
                      <div className="glass-panel p-6 rounded-3xl border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-amber-500" />
                          <h3 className="font-bold text-lg font-outfit">Medicinal Benefits</h3>
                        </div>
                        <ul className="space-y-3">
                          {result.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Precautions */}
                    <div className="glass-panel p-6 rounded-3xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 shadow-sm">
                      <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                        <h3 className="font-bold text-lg font-outfit">Precautions & Side Effects</h3>
                      </div>
                      <ul className="space-y-3">
                        {result.precautions.map((precaution, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-red-800/80 dark:text-red-200/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{precaution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
