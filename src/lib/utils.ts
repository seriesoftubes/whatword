import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


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
export function blurEverything() {
  // Try to avoid weird edge cases where there's an interaction b/n hardware
  // keyboard and virtual keyboard.
  const element = document.activeElement;
  if (element !== document.body && element instanceof HTMLElement) {
    element.blur();
  }
}
