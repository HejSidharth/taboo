"use client";

import { useCallback, useMemo, useState } from "react";
import { Check, RotateCcw, SkipForward } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TABOO_DECK, shuffleCards } from "@/lib/word-repo";

function buildWordDeck() {
  return shuffleCards(TABOO_DECK).map((card) => card.target);
}

export default function HomePage() {
  const [deck, setDeck] = useState<string[]>(() => buildWordDeck());
  const [index, setIndex] = useState(0);
  const [got, setGot] = useState(0);
  const [skipped, setSkipped] = useState(0);

  const currentWord = deck.length > 0 ? deck[index % deck.length] : "word";
  const totalPlayed = got + skipped;
  const accuracy = useMemo(
    () => (totalPlayed === 0 ? 0 : Math.round((got / totalPlayed) * 100)),
    [got, totalPlayed]
  );

  const advanceWord = useCallback(() => {
    setIndex((previous) => {
      const next = previous + 1;

      if (next >= deck.length) {
        setDeck(buildWordDeck());
        return 0;
      }

      return next;
    });
  }, [deck.length]);

  const onGet = useCallback(() => {
    setGot((previous) => previous + 1);
    advanceWord();
  }, [advanceWord]);

  const onSkip = useCallback(() => {
    setSkipped((previous) => previous + 1);
    advanceWord();
  }, [advanceWord]);

  const onReset = useCallback(() => {
    setDeck(buildWordDeck());
    setIndex(0);
    setGot(0);
    setSkipped(0);
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-3 py-8">
        <header className="mb-4">
          <p className="font-newsreader text-base italic text-muted-foreground">Simple Mode</p>
          <h1 className="inline-block border-b-2 border-transparent font-inter text-lg font-bold hover:border-yellow-500">
            Taboo Clone
          </h1>
          <p className="mt-3 font-inter text-base text-foreground">
            500-word deck. Show the word and tap <span className="font-newsreader italic">Get</span> or
            <span className="font-newsreader italic"> Skip</span>.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-2xl border bg-card">
            <CardContent className="pt-5 text-center">
              <p className="font-newsreader text-sm italic text-muted-foreground">Get</p>
              <p className="font-inter text-2xl font-bold">{got}</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border bg-card">
            <CardContent className="pt-5 text-center">
              <p className="font-newsreader text-sm italic text-muted-foreground">Skip</p>
              <p className="font-inter text-2xl font-bold">{skipped}</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border bg-card">
            <CardContent className="pt-5 text-center">
              <p className="font-newsreader text-sm italic text-muted-foreground">Accuracy</p>
              <p className="font-inter text-2xl font-bold">{accuracy}%</p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl border bg-card p-1 grayscale transition hover:grayscale-0">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="font-newsreader text-base font-medium italic">Current Word</CardTitle>
              <Badge variant="outline" className="font-inter text-xs text-muted-foreground">
                {index + 1} / {deck.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border bg-background p-6 text-center sm:p-10">
              <p className="break-words font-inter text-4xl font-bold uppercase tracking-wide sm:text-5xl">
                {currentWord}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-2">
          <Button
            variant="ghost"
            onClick={onReset}
            className="h-10 border-b-2 border-transparent px-0 font-inter text-muted-foreground hover:border-yellow-500 hover:bg-transparent hover:text-yellow-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset and Reshuffle
          </Button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-background/95 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3">
          <Button
            onClick={onSkip}
            variant="secondary"
            className="h-14 border-b-2 border-transparent font-inter text-base font-bold hover:border-yellow-500 hover:text-yellow-500"
          >
            <SkipForward className="mr-2 h-5 w-5" />
            Skip
          </Button>
          <Button
            onClick={onGet}
            className="h-14 border-b-2 border-transparent font-inter text-base font-bold hover:border-yellow-500 hover:text-yellow-500"
          >
            <Check className="mr-2 h-5 w-5" />
            Get
          </Button>
        </div>
      </div>
    </main>
  );
}
