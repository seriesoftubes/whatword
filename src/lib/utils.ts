import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
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
