import React from "react";
import { GuessTile } from "./GuessTile";
import { type GuessedLetter } from "@/lib/types";
import { NUM_TURNS, WORD_LENGTH } from "@/lib/utils";


/** State of the guesses board. */
interface BoardProps {
  guesses: GuessedLetter[][];
  currentGuess: string;
  turn: number;
  forceCursorIndex: number|null;
  onUpdateCursor: (i: number) => void;
}

/** Renders the board where the guesses go. */
export const GuessesBoard: React.FC<BoardProps> = (props: BoardProps) => {
  const { guesses, currentGuess, turn, forceCursorIndex, onUpdateCursor } = props;
  const cursorIndex = forceCursorIndex ?? currentGuess.length;
  const allCorrect = isAllCorrect(guesses);
  return (
    <div className="grid gap-2 md:gap-3" style={{ gridTemplateRows: `repeat(${NUM_TURNS}, 1fr)` }}>
      {Array(NUM_TURNS).fill(null).map((_, rowIdx) => {
        let tiles: React.ReactNode[] = [];
        if (rowIdx < turn) {
          tiles = guesses[rowIdx].map((l, idx) => (
            <GuessTile key={idx}
                       guessedLetter={{
                         value: l.value,
                         status: l.status,
                         reveal: l.reveal
                       }} />
          ));
        } else if (rowIdx === turn) {
          // This is the row for the current guess. It renders the cursor and
          // allows the cursor to move around.
          tiles = Array(WORD_LENGTH).fill(null).map((_, idx) => (
            <GuessTile key={idx}
                       guessedLetter={{
                         value: currentGuess[idx] || "",
                         reveal: false
                       }}
                       hasCursor={ !allCorrect && idx == cursorIndex }
                       onLongPress={ () => onUpdateCursor(idx) } />
          ));
        } else {
          tiles = Array(WORD_LENGTH).fill(null).map((_, idx) => (
            <GuessTile key={idx}
                       guessedLetter={{
                         value: "",
                         reveal: false
                       }} />
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

function isAllCorrect(guesses: GuessedLetter[][]): boolean {
  if (!guesses.length) return false;
  const lastGuess = guesses[guesses.length - 1];
  return lastGuess.every((l) => l.status == 'correct');
}
