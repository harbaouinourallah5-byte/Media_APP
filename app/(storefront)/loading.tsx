'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm min-h-[60vh] py-20">
      <div className="relative flex flex-col items-center justify-center gap-10">
        
        {/* Elegant Minimalist Spinner */}
        <div className="relative flex items-center justify-center w-20 h-20">
          {/* Static thin ring */}
          <div className="absolute inset-0 rounded-full border border-primary/10" />
          
          {/* Spinning elegant gradient ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary border-t-transparent border-l-transparent opacity-80"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center glowing element */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Brand Text Reveal */}
        <div className="flex flex-col items-center gap-3">
          <motion.h2 
            className="font-heading text-xl md:text-2xl font-light tracking-[0.3em] text-foreground uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Medina
          </motion.h2>
          
          {/* Animated loading bar */}
          <div className="w-24 h-[1px] bg-primary/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: "0%", left: "0%" }}
              animate={{ 
                width: ["0%", "50%", "0%"],
                left: ["0%", "50%", "100%"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
