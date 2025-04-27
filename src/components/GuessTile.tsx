import React from "react";
import { combineCssClasses } from "@/lib/utils";
import { type GuessedLetter, type LetterPresence } from '@/lib/types';


const BACKGROUNDS: Map<LetterPresence, string> = new Map([
  ["correct", "bg-wordle-correct border-wordle-correct text-white"],
  ["present", "bg-wordle-present border-wordle-present"],
  ["absent", "bg-wordle-absent border-gray-300 text-gray-400"]
]);

/** Renders a single tile on the guesses board. */
export const GuessTile: React.FC<GuessedLetter> = ({ value, status, reveal }) => {
  const background = status ? BACKGROUNDS.get(status) : "bg-white border-2 border-gray-300";

  return (
    <div
      className={combineCssClasses(
        "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-2xl md:text-3xl rounded-lg uppercase transition-all duration-300",
        background,
        reveal && "animate-pop"
      )}
      style={{ fontFamily: "Inter, system-ui, sans-serif", userSelect: "none", margin: 2 }}
      aria-label={value}>
      {value}
    </div>
  );
};
