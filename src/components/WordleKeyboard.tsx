import React from "react";
import { cn } from "@/lib/utils";
import { LetterPresence } from '@/lib/types'


const KEY_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["BACK","Z","X","C","V","B","N","M","ENTER"]
];

const KEY_WIDTHS = {
  'ENTER': 75,
  'BACK': 33,
};

const BACKGROUND_BY_PRESENCE: { [key: LetterPresence]: string } = {
  "correct": "bg-wordle-correct text-white",
  "present": "bg-wordle-present",
  "absent": "bg-wordle-absent text-gray-400"
};

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
          if (status in BACKGROUND_BY_PRESENCE) {
            backgroundClass = BACKGROUND_BY_PRESENCE[status];
          } else if (key === "ENTER" || key === "BACK") {
            backgroundClass = "bg-wordle-accent text-white";
          }
          const width = KEY_WIDTHS[key] || 30;

          return (
            <button
              key={key}
              className={cn(
                "flex-1 px-1 py-2 md:py-3 md:px-2 rounded-md md:rounded-lg font-semibold text-base md:text-lg transition-all duration-200",
                backgroundClass,
                "active:scale-50"
              )}
              style={{ minWidth: width }}
              onClick={() => onKey(key)}
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
