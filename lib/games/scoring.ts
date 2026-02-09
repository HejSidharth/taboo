import { ScoreLine } from "@/lib/games/types";

export function createScores(
  entries: Array<{
    id: string;
    name: string;
  }>
): ScoreLine[] {
  return entries.map((entry) => ({
    id: entry.id,
    name: entry.name,
    points: 0,
  }));
}

export function updateScore(
  scores: ScoreLine[],
  id: string,
  delta: number,
  options?: {
    floorAtZero?: boolean;
  }
): ScoreLine[] {
  return scores.map((score) => {
    if (score.id !== id) {
      return score;
    }

    const next = score.points + delta;
    return {
      ...score,
      points: options?.floorAtZero ? Math.max(0, next) : next,
    };
  });
}

export function sortScores(scores: ScoreLine[]) {
  return [...scores].sort((left, right) => right.points - left.points);
}

export function getTopScore(scores: ScoreLine[]) {
  return scores.reduce((best, score) => Math.max(best, score.points), 0);
}
