"use client";

import { motion } from "framer-motion";
import { 
  Home, 
  BarChart2, 
  Search,
  User
} from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";

type SlipUpDashboardProps = {
  onStart: () => void;
};

export function SlipUpDashboard({ onStart }: SlipUpDashboardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      } as const,
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200 p-6 pb-40">
      {/* Hero Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 mb-16 text-center"
      >
        <h1 className="text-6xl font-black tracking-tighter text-white leading-tight">
          Don't <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">
            slip up.
          </span>
        </h1>
      </motion.div>

      {/* Simplified Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-sm mx-auto w-full flex flex-col gap-4 flex-1"
      >
        {/* Main CTA Tile */}
        <motion.div 
          variants={itemVariants}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-yellow-500 rounded-[2.5rem] blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative h-56 bg-yellow-500 rounded-[2.5rem] p-10 overflow-hidden flex flex-col justify-between">
            <div className="flex justify-end items-start">
              <span className="text-xs font-black uppercase tracking-widest text-slate-950/60">Ready?</span>
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-950 leading-none mb-2 text-left uppercase tracking-tight">Let's Play</h2>
              <p className="text-slate-950/70 text-base font-medium text-left">Tap to start the round</p>
            </div>
          </div>
        </motion.div>

        {/* Word Count Tile - Muted */}
        <motion.div 
          variants={itemVariants}
          className="h-28 bg-slate-900/40 rounded-[2.5rem] border border-slate-800/50 p-8 flex flex-col justify-center backdrop-blur-sm shadow-xl"
        >
          <div>
            <p className="text-xl font-black text-white leading-tight">1,600+ Words</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Classic Deck Loaded</p>
          </div>
        </motion.div>
      </motion.div>

      {/* New Dock Component */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: "spring", damping: 20 }}
        className="fixed bottom-10 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Dock direction="middle" className="bg-slate-900/80 border-slate-800/50 rounded-full">
            <DockIcon className="bg-yellow-500 text-slate-950 shadow-lg">
              <Home size={20} />
            </DockIcon>
            <DockIcon className="text-slate-400 hover:bg-slate-800 transition-colors">
              <Search size={20} />
            </DockIcon>
            <DockIcon className="text-slate-400 hover:bg-slate-800 transition-colors">
              <BarChart2 size={20} />
            </DockIcon>
            <DockIcon className="text-slate-400 hover:bg-slate-800 transition-colors">
              <User size={20} />
            </DockIcon>
          </Dock>
        </div>
      </motion.div>
    </div>
  );
}

