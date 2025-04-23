
import React from "react";
import { cn } from "@/lib/utils";
import { LetterPresence } from '@/lib/types'


const KEY_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","BACK"]
];

type KeyStatus = Record<string, LetterPresence | undefined>;

interface WordleKeyboardProps {
  onKey: (key: string) => void;
  keyStatus: KeyStatus;
}

export const WordleKeyboard: React.FC<WordleKeyboardProps> = ({ onKey, keyStatus }) => (
  <div className="flex flex-col gap-2 w-full max-w-md mx-auto select-none">
    {KEY_ROWS.map((row, ri) => (
      <div key={ri} className="flex justify-center gap-1">
        {row.map((key) => {
          let bg = "bg-wordle-key";
          if (keyStatus[key] === "correct") bg = "bg-wordle-correct text-white";
          else if (keyStatus[key] === "present") bg = "bg-wordle-present";
          else if (keyStatus[key] === "absent") bg = "bg-wordle-absent text-gray-400";
          if (key === "ENTER" || key === "BACK") bg = "bg-wordle-accent text-white";
          const width = key == 'ENTER' ? 75 : 36;

          return (
            <button
              key={key}
              className={cn(
                "flex-1 px-1 py-2 md:py-3 md:px-2 rounded-md md:rounded-lg font-semibold text-base md:text-lg transition-all duration-200",
                bg,
                "active:scale-95"
              )}
              style={{ minWidth: width }}
              onClick={() => onKey(key)}
              aria-label={key}
              tabIndex={-1}
            >
              {key === "BACK" ? "⌫" : key}
            </button>
          );
        })}
      </div>
    ))}
  </div>
);
