/** Common types. */


/** Valid values for LetterPresence. */
export const LetterPresenceValues = ['correct', 'present', 'absent'] as const;

/** The presence of a letter. */
export type LetterPresence = typeof LetterPresenceValues[number];

/** The status of the game. */
export type GameStatus = "playing" | "won" | "lost";

/** A letter that was guessed on the board. */
export interface GuessedLetter {
  value: string;
  status?: LetterPresence;
  reveal: boolean;
  // Whether the GuessTile should have the cursor (it's the current guess being
  // entered).
  hasCursor?: boolean;
}

/** A key on the keyboard representing an action. */
export type Action = "BACK" | "ENTER";

/** A key on the keyboard representing a letter or an action. */
export type Key = (Action | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" |
  "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" |
  "T" | "U" | "V" | "W" | "X" | "Y" | "Z");

/** The presence results of the keys from a guess. */
export type KeyPresences = Record<Key, LetterPresence | undefined>;
