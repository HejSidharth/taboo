import { GameDefinition, GameMode } from "@/lib/games/types";

export const GAMES: GameDefinition[] = [
  {
    id: "taboo",
    name: "Slip Up",
    tagline: "Don't say the forbidden words.",
    description:
      "Describe the word without using the taboo terms.",
    route: "/games/taboo/play",
    accentClass: "from-yellow-500/30 via-yellow-500/10 to-transparent",
    scoringLabel: "Correct answers add points, slips deduct points.",
    modes: [
      {
        id: "classic",
        name: "Classic",
        description: "Standard 60-second rounds.",
        rules: ["60 seconds", "+1 point", "-1 slip"],
      },
    ],
  },
];

const SLIP_UP = GAMES[0];

export function getGameDefinition(value: string) {
  if (value === "taboo") {
    return SLIP_UP;
  }
  return null;
}

export function getGameMode(modeId?: string): GameMode {
  if (!modeId) {
    return SLIP_UP.modes[0];
  }

  return SLIP_UP.modes.find((mode) => mode.id === modeId) ?? SLIP_UP.modes[0];
}
