"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SlipUpTutorialProps = {
  onComplete: () => void;
};

export function SlipUpTutorial({ onComplete }: SlipUpTutorialProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 1000);
      return () => clearTimeout(timer);
    }
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(timer);
    }
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-slate-950 p-8 pt-8 pb-20">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mt-12">How to play</h2>
        <p className="text-slate-500 font-medium">Master the swipe</p>
      </div>

      <div className="relative w-full max-w-[280px] h-[360px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <p className="text-xl font-bold text-slate-400">Get ready...</p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                x: [0, -100, -100, 0],
                rotate: [0, -15, -15, 0],
                opacity: [0, 1, 1, 1]
              }}
              transition={{ 
                duration: 3,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="w-full h-full bg-white dark:bg-slate-900 rounded-[2rem] border-4 border-amber-500 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-amber-600 h-1/3 flex items-center justify-center">
                 <span className="text-white font-black text-2xl uppercase">SKIP</span>
              </div>
              <div className="flex-1 p-6 space-y-4">
                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4" />
                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2" />
                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3" />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 0, rotate: 0, opacity: 0 }}
              animate={{ 
                x: [0, 100, 100, 0],
                rotate: [0, 15, 15, 0],
                opacity: [0, 1, 1, 1]
              }}
              transition={{ 
                duration: 3,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="w-full h-full bg-white dark:bg-slate-900 rounded-[2rem] border-4 border-emerald-500 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-emerald-600 h-1/3 flex items-center justify-center">
                 <span className="text-white font-black text-2xl uppercase">GOT IT!</span>
              </div>
              <div className="flex-1 p-6 space-y-4">
                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4" />
                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2" />
                 <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3" />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center gap-4"
            >
               <p className="text-2xl font-black uppercase text-slate-900 dark:text-white">You're all set</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full max-w-[280px] h-20 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="text1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-amber-600 font-bold text-center"
            >
              Swipe left to skip a word
            </motion.p>
          )}
          {step === 2 && (
            <motion.p
              key="text2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-emerald-600 font-bold text-center"
            >
              Swipe right when they guess it
            </motion.p>
          )}
          {step === 3 && (
            <motion.div
              key="btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="h-16 px-12 text-xl rounded-2xl bg-yellow-500 text-slate-950 hover:bg-yellow-400 font-black shadow-xl"
                onClick={onComplete}
              >
                LET'S GO
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Progress dots */}
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              step === i ? "bg-slate-900 dark:bg-white w-6" : "bg-slate-200 dark:bg-slate-800"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
