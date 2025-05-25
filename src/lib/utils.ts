import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { type LetterPresence } from './types';

/**
 * Maximum number of times you can guess a word.
 * Corresponds to the height of the guesses board.
 */
export const NUM_TURNS = 6;

/**
 * The number of letters in each word you can guess.
 * Corresponds to the width of the guesses board.
 */
export const WORD_LENGTH = 5;

/** Combines classes (as objects or strings) in a tailwind aware manner. */
export function combineCssClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** If any element is focused, this blurs it. */
export function blurEverything(): void {
  // Try to avoid weird edge cases where there's an interaction b/n hardware
  // keyboard and virtual keyboard.
  const element = document.activeElement;
  if (element !== document.body && element instanceof HTMLElement) {
    element.blur();
  }
}

/** Compare a to b.  If a > b, returns -1; same is 0; b > a is +1. */
export function comparePresence(a: LetterPresence, b: LetterPresence): number {
  if (a === b) return 0;
  // Below here, a and b are different.
  if (a === 'correct') return -1;
  if (b === 'correct') return 1;
  // Below here, neither are correct, so both are present/absent.
  if (a === 'present') return -1;
  if (b === 'present') return 1;
  throw new Error('unreachable');
}

/** Upserts `x` at `index` in `word`. */
export function replaceLetter(word: string, x: string, index: number): string {
  if (index < 0) throw new Error(`index ${index} must be >= 0`);
  if (x.length > 1) throw new Error(`x "${x}" must be at most 1 character`);
  if (index >= word.length) return word + x;
  const letters = word.split('');
  letters[index] = x;
  return letters.join('');
}
