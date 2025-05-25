import React from "react";
import { GuessTile } from "./GuessTile";
import { type GuessedLetter } from '@/lib/types';
import { NUM_TURNS, WORD_LENGTH } from '@/lib/utils';


/** State of the game. */
interface Game {
  guesses: GuessedLetter[][];
  currentGuess: string;
  turn: number;
}

/** Renders the board where the guesses go. */
export const GuessesBoard: React.FC<Game> = ({ guesses, currentGuess, turn }) => {
  const cursorIndex = currentGuess.length;
  return (
    <div className="grid gap-2 md:gap-3" style={{ gridTemplateRows: `repeat(${NUM_TURNS}, 1fr)` }}>
      {Array(NUM_TURNS).fill(null).map((_, rowIdx) => {
        let tiles: React.ReactNode[] = [];
        if (rowIdx < turn) {
          tiles = guesses[rowIdx].map((l, idx) => (
            <GuessTile key={idx} value={l.value} status={l.status} reveal={l.reveal} />
          ));
        } else if (rowIdx === turn) {
          tiles = Array(WORD_LENGTH).fill(null).map((_, idx) => (
            <GuessTile key={idx} value={currentGuess[idx] || ""} reveal={false}
                       hasCursor={ idx == cursorIndex } />
          ));
        } else {
          tiles = Array(WORD_LENGTH).fill(null).map((_, idx) => (
            <GuessTile key={idx} value="" reveal={false} />
          ));
        }
        return (
          <div
            key={rowIdx}
            className="flex gap-2 md:gap-3 justify-center"
            style={{ minHeight: 48 }}>
            {tiles}
          </div>
        );
      })}
    </div>
  );
};
