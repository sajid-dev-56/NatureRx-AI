"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export function FavoriteButton({ id }: { id: string | number }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
      }}
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group relative"
      aria-label="Toggle Favorite"
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={clsx(
            "w-5 h-5 transition-colors", 
            isFavorite ? "fill-rose-500 text-rose-500" : "text-muted-foreground group-hover:text-rose-400"
          )} 
        />
      </motion.div>
      {isFavorite && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-rose-500"
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </button>
  );
}
