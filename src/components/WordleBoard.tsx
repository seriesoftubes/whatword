import React from "react";
import { WordleTile } from "./WordleTile";
import { LetterPresence } from '@/lib/types'

interface LetterState {
  value: string;
  status?: LetterPresence;
  reveal: boolean;
}

interface WordleBoardProps {
  guesses: LetterState[][];
  currentGuess: string;
  turn: number;
}

export const WordleBoard: React.FC<WordleBoardProps> = ({ guesses, currentGuess, turn }) => {
  const NUM_ROWS = 6;
  const NUM_COLS = 5;

  return (
    <div className="grid gap-2 md:gap-3" style={{ gridTemplateRows: `repeat(${NUM_ROWS}, 1fr)` }}>
      {Array(NUM_ROWS).fill(null).map((_, rowIdx) => {
        let tiles: React.ReactNode[] = [];
        if (rowIdx < turn) {
          tiles = guesses[rowIdx].map((l, idx) => (
            <WordleTile key={idx} value={l.value} status={l.status} reveal={l.reveal} />
          ));
        } else if (rowIdx === turn) {
          tiles = Array(NUM_COLS).fill(null).map((_, idx) => (
            <WordleTile key={idx} value={currentGuess[idx] || ""} reveal={false} />
          ));
        } else {
          tiles = Array(NUM_COLS).fill(null).map((_, idx) => (
            <WordleTile key={idx} value="" reveal={false} />
          ));
        }
        return (
          <div
            key={rowIdx}
            className="flex gap-2 md:gap-3 justify-center"
            style={{ minHeight: 48 }}
          >
            {tiles}
          </div>
        );
      })}
    </div>
  );
};
