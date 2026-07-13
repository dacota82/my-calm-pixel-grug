import { STORAGE_KEY } from "../data/calmContent";
import type { CalmCard } from "../types/calm";

export function loadCards(): CalmCard[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as CalmCard[]) : [];
  } catch {
    return [];
  }
}

export function saveCards(cards: CalmCard[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function addCard(card: CalmCard): CalmCard[] {
  const cards = loadCards();
  cards.unshift(card);
  saveCards(cards);
  return cards;
}

export function deleteCard(cardId: string): CalmCard[] {
  const cards = loadCards().filter((card) => card.id !== cardId);
  saveCards(cards);
  return cards;
}
