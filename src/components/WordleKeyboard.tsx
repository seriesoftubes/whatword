import React from "react";
import { cn } from "@/lib/utils";
import { LetterPresence } from '@/lib/types'


type Key = ("BACK" | "ENTER" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" |
           "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" |
           "T" | "U" | "V" | "W" | "X" | "Y" | "Z");

const KEY_ROWS: Array<Array<Key>> = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["BACK","Z","X","C","V","B","N","M","ENTER"]
];

const KEY_WIDTHS: Map<Key, number> = new Map([
  ['ENTER', 75],
  ['BACK', 33],
]);

const BACKGROUNDS: Map<LetterPresence, string> = new Map([
  ["correct", "bg-wordle-correct text-white"],
  ["present", "bg-wordle-present"],
  ["absent", "bg-wordle-absent text-gray-400"]
]);

type KeyStatus = Record<string, LetterPresence | undefined>;

interface WordleKeyboardProps {
  onKey: (key: string) => void;
  keyStatus: KeyStatus;
}


export const WordleKeyboard: React.FC<WordleKeyboardProps> = ({ onKey, keyStatus }) => (
  <div className="flex flex-col gap-2 px-12 w-full max-w-md mx-auto select-none">
    {KEY_ROWS.map((row, ri) => (
      <div key={ri} className="flex justify-center gap-1">
        {row.map((key) => {
          const status = keyStatus[key];
          let backgroundClass = "bg-wordle-key";
          if (status && BACKGROUNDS.has(status)) {
            backgroundClass = BACKGROUNDS.get(status)!;
          } else if (key === "ENTER" || key === "BACK") {
            backgroundClass = "bg-wordle-accent text-white";
          }
          const width = KEY_WIDTHS.get(key) || 30;

          return (
            <button
              key={key}
              className={cn(
                "flex-1 px-1 py-2 md:py-3 md:px-2 rounded-md md:rounded-lg font-semibold text-base md:text-lg transition-all duration-200",
                backgroundClass,
                "active:scale-50"
              )}
              style={{ minWidth: width }}
              onClick={(event) => {
                  event.currentTarget.blur();
                  onKey(key);
                }
              }
              aria-label={key}
              tabIndex={-1}>
              {key === "BACK" ? "⌫" : key}
            </button>
          );
        })}
      </div>
    ))}
  </div>
);
