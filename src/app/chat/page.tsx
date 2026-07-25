"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Send, Sparkles, User, AlertTriangle, Mic, MicOff } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  isEmergency?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I am NatureRx AI. How can I help you with natural wellness today? (Please note: For medical emergencies, always consult a doctor).",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to persist SpeechRecognition instance across renders without triggering effects unnecessarily
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInput(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Mock AI Response (Later connect to Next.js API route / Supabase / Gemini)
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    })
    .then((res) => res.json())
    .then((data) => {
      const isEmergency = userMessage.content.toLowerCase().includes("chest pain") || userMessage.content.toLowerCase().includes("bleeding");
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.error ? "Sorry, there was an error processing your request." : data.result,
        isEmergency: isEmergency
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setIsLoading(false);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="glass-panel flex-shrink-0 h-16 flex items-center justify-between px-6 border-b border-border z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="font-bold font-outfit text-sm leading-tight">NatureRx AI</h1>
              <p className="text-xs text-primary font-medium">Online</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-grow overflow-y-auto p-6 space-y-6">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                "flex gap-4 w-full",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={clsx(
                "w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm",
                msg.role === "user" ? "bg-secondary text-secondary-foreground" : "bg-primary text-white"
              )}>
                {msg.role === "user" ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              
              <div className={clsx(
                "max-w-[80%] rounded-2xl p-4 shadow-sm",
                msg.role === "user" 
                  ? "bg-foreground text-background rounded-tr-sm" 
                  : msg.isEmergency 
                    ? "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-tl-sm text-red-900 dark:text-red-200" 
                    : "glass-panel rounded-tl-sm"
              )}>
                {msg.isEmergency && (
                  <div className="flex items-center gap-2 mb-2 font-bold text-red-600 dark:text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    Safety Alert
                  </div>
                )}
                <p className="leading-relaxed text-sm sm:text-base whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="glass-panel rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="glass-panel flex-shrink-0 p-4 border-t border-border z-10">
        <div className="max-w-3xl mx-auto relative flex items-center gap-2">
          {recognitionRef.current && (
            <button
              onClick={toggleListening}
              className={clsx(
                "p-4 rounded-full transition-all shadow-sm flex-shrink-0",
                isListening 
                  ? "bg-rose-500 text-white animate-pulse" 
                  : "bg-white/50 dark:bg-black/50 border border-border text-foreground hover:bg-black/5 dark:hover:bg-white/10"
              )}
              title={isListening ? "Stop listening" : "Start speaking"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}
          
          <div className="relative flex-grow">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? "Listening..." : "Describe your symptoms (e.g., I have a sore throat)..."}
              className="w-full bg-white/50 dark:bg-black/50 border border-border rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-3 font-medium">
          NatureRx AI is for educational purposes and does not replace professional medical advice.
        </p>
      </footer>
    </div>
  );
}
