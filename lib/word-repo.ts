import categories from "./data/taboo/categories.json";
import animals from "./data/taboo/en/animals.json";
import cars from "./data/taboo/en/cars.json";
import cityCountry from "./data/taboo/en/city-country.json";
import food from "./data/taboo/en/food.json";
import literature from "./data/taboo/en/literature.json";
import people from "./data/taboo/en/people.json";
import sports from "./data/taboo/en/sports.json";
import things from "./data/taboo/en/things.json";
import tv from "./data/taboo/en/tv.json";
import web from "./data/taboo/en/web.json";

export type TabooCard = {
  id: number;
  target: string;
  taboo: string[];
  category: string;
};

type CategoryMeta = {
  text: string;
};

type CategoriesByLanguage = {
  en: Record<string, CategoryMeta>;
};

type RawCategoryCards = Record<string, string[]>;

const CATEGORY_LABELS = (categories as CategoriesByLanguage).en;

const CATEGORY_SOURCES: Record<string, RawCategoryCards> = {
  animals: animals as RawCategoryCards,
  cars: cars as RawCategoryCards,
  "city-country": cityCountry as RawCategoryCards,
  food: food as RawCategoryCards,
  literature: literature as RawCategoryCards,
  people: people as RawCategoryCards,
  sports: sports as RawCategoryCards,
  things: things as RawCategoryCards,
  tv: tv as RawCategoryCards,
  web: web as RawCategoryCards,
};

function normalizeWord(value: string) {
  return value.trim().toLowerCase();
}

function cleanTabooWords(target: string, tabooWords: unknown) {
  if (!Array.isArray(tabooWords)) {
    return [];
  }

  const normalizedTarget = normalizeWord(target);
  const seen = new Set<string>();
  const cleaned: string[] = [];

  for (const tabooWord of tabooWords) {
    if (typeof tabooWord !== "string") {
      continue;
    }

    const trimmed = tabooWord.trim();
    if (!trimmed) {
      continue;
    }

    const normalized = normalizeWord(trimmed);
    if (normalized === normalizedTarget || seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    cleaned.push(trimmed);
  }

  return cleaned;
}

function buildDeck() {
  const deck: TabooCard[] = [];
  let id = 1;

  for (const [categoryKey, categoryConfig] of Object.entries(CATEGORY_LABELS)) {
    const source = CATEGORY_SOURCES[categoryKey];

    if (!source) {
      continue;
    }

    for (const [target, tabooWords] of Object.entries(source)) {
      const cleanTarget = target.trim();
      const cleanTaboo = cleanTabooWords(cleanTarget, tabooWords);

      if (!cleanTarget || cleanTaboo.length === 0) {
        continue;
      }

      deck.push({
        id,
        target: cleanTarget,
        taboo: cleanTaboo,
        category: categoryConfig.text,
      });

      id += 1;
    }
  }

  return deck;
}

export const TABOO_DECK = buildDeck();

if (process.env.NODE_ENV !== "production" && TABOO_DECK.length === 0) {
  throw new Error("Taboo deck is empty. Failed to load source data.");
}

export function shuffleCards(cards: TabooCard[]) {
  const next = [...cards];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}
