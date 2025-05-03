import React, { type CSSProperties } from "react";
import { combineCssClasses } from "@/lib/utils";
import { type GuessedLetter, type LetterPresence } from '@/lib/types';


const BACKGROUNDS: Map<LetterPresence, string> = new Map([
  ["correct", "bg-wordle-correct border-wordle-correct text-white"],
  ["present", "bg-wordle-present border-wordle-present"],
  ["absent", "bg-wordle-absent border-gray-800 text-gray-500"]
]);
const DEFAULT_BACKGROUND = "bg-wordle-tile border-2 border-purple-500 text-white";
const STYLES: CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  userSelect: "none",
  margin: 2,
};


/** Renders a single tile on the guesses board. */
export const GuessTile: React.FC<GuessedLetter> = ({ value, status, reveal }) => {
  const background = status ? BACKGROUNDS.get(status) : DEFAULT_BACKGROUND;
  return (
    <div
      className={combineCssClasses(
        "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-2xl md:text-3xl rounded-lg uppercase transition-all duration-300",
        background,
        reveal && "animate-pop"
      )}
      style={STYLES}
      aria-label={value}>
      {value}
    </div>
  );
};
