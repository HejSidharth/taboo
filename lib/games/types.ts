export type GameId = "taboo";

export type GameMode = {
  id: string;
  name: string;
  description: string;
  rules: string[];
};

export type GameDefinition = {
  id: GameId;
  name: string;
  tagline: string;
  description: string;
  route: string;
  accentClass: string;
  scoringLabel: string;
  modes: GameMode[];
};

export type TeamId = "red" | "blue";

export type ScoreLine = {
  id: string;
  name: string;
  points: number;
};

export type ScoreDeltaMap = Record<string, number>;

export type RoundLog = {
  id: number;
  title: string;
  detail: string;
  delta?: ScoreDeltaMap;
};
