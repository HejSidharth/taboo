"use client";

import { useCallback, useEffect, useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SlipUpPlayView } from "@/components/games/slip-up-play-view";
import { SlipUpDashboard } from "@/components/games/slip-up-dashboard";
import { TABOO_DECK, TabooCard, shuffleCards } from "@/lib/word-repo";

type TabooModeId = "classic" | "quick" | "custom";

type TabooModeSettings = {
  roundSeconds: number;
  pointsPerCorrect: number;
};

const TABOO_MODE_CONFIG: Record<TabooModeId, TabooModeSettings> = {
  classic: {
    roundSeconds: 60,
    pointsPerCorrect: 1,
  },
  quick: {
    roundSeconds: 45,
    pointsPerCorrect: 1,
  },
  custom: {
    roundSeconds: 60,
    pointsPerCorrect: 1,
  },
};

function getModeSettings(modeId: string) {
  const key = modeId as TabooModeId;
  return TABOO_MODE_CONFIG[key] ?? TABOO_MODE_CONFIG.classic;
}

function buildDeck(): TabooCard[] {
  return shuffleCards(TABOO_DECK);
}

export function TabooGame({ modeId }: { modeId: string }) {
  const [settings] = useState<TabooModeSettings>(() => getModeSettings(modeId));
  const [deck, setDeck] = useState<TabooCard[]>(() => buildDeck());
  const [cardIndex, setCardIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(settings.roundSeconds);
  const [showPlayView, setShowPlayView] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundStats, setRoundStats] = useState({ got: 0, skipped: 0 });

  const currentCard = deck[cardIndex % deck.length];

  // Reset when mode changes
  useEffect(() => {
    const nextSettings = getModeSettings(modeId);
    setDeck(buildDeck());
    setCardIndex(0);
    setShowPlayView(false);
    setRoundStarted(false);
    setRoundStats({ got: 0, skipped: 0 });
    setTimeLeft(nextSettings.roundSeconds);
  }, [modeId]);

  const nextCard = useCallback(() => {
    setCardIndex((previous) => {
      const next = previous + 1;

      if (next >= deck.length) {
        setDeck(buildDeck());
        return 0;
      }

      return next;
    });
  }, [deck.length]);

  const endRound = useCallback(() => {
    setShowPlayView(false);
    setRoundStarted(false);
    setTimeLeft(settings.roundSeconds);
    // Shuffle for next round
    setDeck(buildDeck());
    setCardIndex(0);
  }, [settings.roundSeconds]);

  const onStartRound = useCallback(() => {
    setRoundStats({ got: 0, skipped: 0 });
    setTimeLeft(settings.roundSeconds);
    setRoundStarted(true);
  }, [settings.roundSeconds]);

  const onGet = useCallback(() => {
    if (!roundStarted) return;
    setRoundStats((prev) => ({ ...prev, got: prev.got + 1 }));
    nextCard();
  }, [nextCard, roundStarted]);

  const onSkip = useCallback(() => {
    if (!roundStarted) return;
    setRoundStats((prev) => ({ ...prev, skipped: prev.skipped + 1 }));
    nextCard();
  }, [nextCard, roundStarted]);

  // Timer
  useEffect(() => {
    if (!roundStarted || timeLeft <= 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [roundStarted, timeLeft]);

  // End round when timer hits 0
  useEffect(() => {
    if (roundStarted && timeLeft === 0) {
      endRound();
    }
  }, [endRound, roundStarted, timeLeft]);

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {showPlayView ? (
          <motion.div
            key="play-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <SlipUpPlayView
              card={currentCard}
              timeLeft={timeLeft}
              onGet={onGet}
              onSkip={onSkip}
              onStart={onStartRound}
              isStarted={roundStarted}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <SlipUpDashboard onStart={() => setShowPlayView(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
