"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SlipUpTutorial } from "@/components/games/slip-up-tutorial";
import { cn } from "@/lib/utils";
import { TabooCard } from "@/lib/word-repo";

type SlipUpPlayViewProps = {
  card: TabooCard;
  timeLeft: number;
  onGet: () => void;
  onSkip: () => void;
  onStart: () => void;
  isStarted: boolean;
};

function formatClock(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export function SlipUpPlayView({
  card,
  timeLeft,
  onGet,
  onSkip,
  onStart,
  isStarted,
}: SlipUpPlayViewProps) {
  const [showTutorial, setShowTutorial] = useState(true);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const skipOpacity = useTransform(x, [-150, -50], [1, 0]);
  const gotOpacity = useTransform(x, [50, 150], [0, 1]);
  
  const borderColor = useTransform(
    x,
    [-150, 0, 150],
    ["rgb(245, 158, 11)", "rgb(226, 232, 240)", "rgb(16, 185, 129)"]
  );

  const handleTutorialComplete = useCallback(() => {
    setShowTutorial(false);
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onGet();
    } else if (info.offset.x < -100) {
      onSkip();
    }
    x.set(0);
  };

  if (showTutorial) {
    return <SlipUpTutorial onComplete={handleTutorialComplete} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 touch-none select-none">
      {/* Header Info */}
      <div className="pt-12 pb-4 px-8 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            Time Remaining
          </span>
          <div className={cn(
            "text-3xl font-black tabular-nums transition-colors duration-300",
            timeLeft <= 10 ? "text-rose-500 animate-pulse" : "text-slate-900 dark:text-white"
          )}>
            {formatClock(timeLeft)}
          </div>
        </div>
        
        {isStarted && (
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
              Live
            </span>
          </div>
        )}
      </div>

      {/* Main card area */}
      <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {!isStarted ? (
            <motion.div 
              key="ready-screen"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              className="flex flex-col items-center gap-10"
            >
              <div className="relative">
                 <div className="absolute inset-0 translate-x-3 translate-y-3 bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] -z-10" />
                 <div className="w-[300px] bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                    <div className="bg-slate-900 py-12 text-center">
                      <h2 className="text-white text-3xl font-black uppercase tracking-tight">Ready?</h2>
                    </div>
                     <div className="p-8 space-y-6 text-center">
                        <div className="flex flex-col items-center gap-1">
                             <p className="font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">Swipe Right</p>
                             <p className="text-sm text-slate-500 font-medium">When they get it</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                             <p className="font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">Swipe Left</p>
                             <p className="text-sm text-slate-500 font-medium">To skip the word</p>
                        </div>
                     </div>
                 </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="h-16 px-16 text-xl rounded-full bg-yellow-500 text-slate-950 font-black shadow-xl hover:bg-yellow-400 transition-colors uppercase tracking-tight"
                  onClick={onStart}
                >
                  START
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <div className="relative w-full max-w-[340px] h-[480px]">
              {/* Visual stack - background cards */}
              <div className="absolute inset-0 translate-y-4 scale-[0.92] bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] -z-20 opacity-50" />
              <div className="absolute inset-0 translate-y-2 scale-[0.96] bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 -z-10" />
              
              <motion.div
                key={card.id}
                style={{ x, rotate, opacity, borderColor, borderWidth: 2 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing flex flex-col overflow-hidden"
              >
                {/* Visual Indicators */}
                <motion.div 
                  style={{ opacity: skipOpacity }}
                  className="absolute top-6 left-6 z-10 border-4 border-amber-500 text-amber-500 font-black px-4 py-1 rounded-xl rotate-[-12deg] uppercase text-2xl"
                >
                  Skip
                </motion.div>
                <motion.div 
                  style={{ opacity: gotOpacity }}
                  className="absolute top-6 right-6 z-10 border-4 border-emerald-500 text-emerald-500 font-black px-4 py-1 rounded-xl rotate-[12deg] uppercase text-2xl"
                >
                  Got It
                </motion.div>

                {/* Card Header */}
                <div className="bg-slate-900 pt-20 pb-12 px-6 text-center">
                  <h1 className="text-white text-5xl font-black uppercase tracking-tighter break-words">
                    {card.target}
                  </h1>
                </div>

                {/* Forbidden Words */}
                <div className="flex-1 p-8 flex flex-col justify-center gap-6">
                  {card.taboo.map((word, i) => (
                    <motion.div 
                      key={word}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center gap-4"
                    >
                       <span className="text-2xl font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight w-full text-center">
                        {word}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Bottom decorative bar */}
                <div className="h-3 bg-slate-900 w-1/4 mx-auto mb-6 rounded-full opacity-10" />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint */}
      {isStarted && (
        <div className="pb-12 text-center px-8">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
            Don't say the forbidden words!
          </p>
        </div>
      )}
    </div>
  );
}
