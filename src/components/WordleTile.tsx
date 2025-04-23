
import React from "react";
import { cn } from "@/lib/utils";
import { LetterPresence } from '@/lib/types'


interface WordleTileProps {
  value: string;
  status?: LetterPresence;
  reveal: boolean;
}

export const WordleTile: React.FC<WordleTileProps> = ({ value, status, reveal }) => {
  let bg = "bg-white border-2 border-gray-300";
  if (status === "correct") bg = "bg-wordle-correct border-wordle-correct text-white";
  else if (status === "present") bg = "bg-wordle-present border-wordle-present";
  else if (status === "absent") bg = "bg-wordle-absent border-gray-300 text-gray-400";

  return (
    <div
      className={cn(
        "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-2xl md:text-3xl rounded-lg uppercase transition-all duration-300",
        bg,
        reveal && "animate-pop"
      )}
      style={{ fontFamily: "Inter, system-ui, sans-serif", userSelect: "none", margin: 2 }}
      aria-label={value}
    >
      {value}
    </div>
  );
};
