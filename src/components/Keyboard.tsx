import React from "react";
import { combineCssClasses, blurEverything } from "@/lib/utils";
import { type LetterPresence, type Key, type KeyPresences } from '@/lib/types';


const KEY_ROWS: Array<Array<Key>> = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [ "Z", "X", "C", "V", "B", "N", "M", "BACK"],
  ["ENTER"]
];

const KEY_WIDTHS: Map<Key, number> = new Map([
  ['ENTER', 75],
  ['BACK', 75],
]);

const KEY_PATTERNS: Map<Key, string> = new Map([
  ["ENTER", "ENTER ↵"],
  ["BACK", "DEL ⌫"],
]);

const BACKGROUNDS: Map<LetterPresence, string> = new Map([
  ["correct", "bg-whatword-correct text-white"],
  ["present", "bg-whatword-present"],
  ["absent", "bg-whatword-absent text-gray-400"]
]);

interface KeyboardProps {
  onKey: (key: Key) => void;
  keyPresences: KeyPresences;
}

let timeoutId = 0;
let repeatId = 0;

/** Component that renders the keyboard for entering guesses. */
export const Keyboard: React.FC<KeyboardProps> = ({ onKey, keyPresences }) => {
  const onClickKey = (key: Key) => {
    blurEverything();
    onKey(key);
    if (key != 'BACK') {
      return;
    }
    // Allow repeating the BACK action key.
    timeoutId = window.setTimeout(() => {
      repeatId = window.setInterval(() => {
        onKey(key);
      }, 250);
    }, 150);
  };
  const onStopClickingKey = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = 0;
    }
    if (repeatId) {
      window.clearInterval(repeatId);
      repeatId = 0;
    }
  };

  const getBackgroundClass = (key: Key) => {
    const pres = keyPresences[key];
    if (pres && BACKGROUNDS.has(pres)) {
      return BACKGROUNDS.get(pres)!;
    } else if (key === "ENTER" || key === "BACK") {
      return "bg-whatword-accent text-white";
    }
    return "bg-whatword-key text-white";
  };

  return (
    <div className="flex flex-col gap-2 px-12 w-full max-w-md mx-auto select-none">
      {KEY_ROWS.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-1.5">
          {row.map((key) => {
            const backgroundClass = getBackgroundClass(key);
            const width = KEY_WIDTHS.get(key) || 32;
            const pattern = KEY_PATTERNS.get(key) || key;
            return (
              <button
                key={key}
                className={combineCssClasses(
                  "flex-1 px-1 py-2 md:py-3 md:px-2 rounded-md md:rounded-lg font-semibold text-base transition-all duration-200",
                  backgroundClass,
                  "active:bg-white"
                )}
                style={{ minWidth: width, maxWidth: 150 }}
                onMouseDown={ () => onClickKey(key) }
                onMouseUp={ () => onStopClickingKey() }
                aria-label={key}
                tabIndex={-1}>
                {pattern}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
