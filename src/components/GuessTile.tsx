import React, { type CSSProperties } from "react";
import { combineCssClasses } from "@/lib/utils";
import { type GuessedLetter, type LetterPresence } from '@/lib/types';


const BACKGROUNDS: Map<LetterPresence, string> = new Map([
  ["correct", "bg-whatword-correct border-whatword-correct text-white"],
  ["present", "bg-whatword-present border-whatword-present"],
  ["absent", "bg-whatword-absent border-gray-800 text-gray-400"]
]);
const DEFAULT_BACKGROUND = "bg-whatword-tile border-2 border-purple-500 text-white";
const STYLES: CSSProperties = {
  fontFamily: "Inter, system-ui, sans-serif",
  userSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  WebkitUserSelect: "none",
  margin: 2,
};

interface GuessTileProps {
  guessedLetter: GuessedLetter;
  // Whether the tile should show the cursor under it.
  hasCursor?: boolean;
  // What, if anything, should be done when the user long presses the tile.
  onLongPress?: () => void;
}

let timeoutId = 0;

/** Renders a single tile on the guesses board. */
export const GuessTile: React.FC<GuessTileProps> = (props: GuessTileProps) => {
  const { guessedLetter, hasCursor, onLongPress } = props;
  const { value, status, reveal } = guessedLetter;
  const background = status ? BACKGROUNDS.get(status) : DEFAULT_BACKGROUND;

  const onStartClicking = () => {
    if (!onLongPress) return;
    timeoutId = window.setTimeout(onLongPress, 200);
  };
  const onStopClicking = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = 0;
    }
  };

  return (
    <div
      className={combineCssClasses(
        "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-bold text-2xl md:text-3xl rounded-lg uppercase transition-all duration-300",
        background,
        reveal && "animate-pop",
        hasCursor && "with-cursor"
      )}
      onPointerDown={onStartClicking}
      onPointerUp={onStopClicking}
      onPointerLeave={onStopClicking}
      onPointerCancel={onStopClicking}
      style={STYLES}
      aria-label={value}>
      {value}
    </div>
  );
};
