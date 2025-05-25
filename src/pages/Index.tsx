import React, { useCallback, useState, useRef } from "react";
import { WORDS, OTHER_WORDS } from "@/words";
import { GuessesBoard } from "@/components/GuessesBoard";
import { Keyboard } from "@/components/Keyboard";
import { type GameStatus, type GuessedLetter, type LetterPresence, type Key, type KeyPresences } from "@/lib/types";
import { blurEverything, comparePresence, NUM_TURNS, WORD_LENGTH } from "@/lib/utils";


const GRADIENT = 'linear-gradient(0deg, rgb(28, 21, 53) 0%, rgb(81, 58, 173) 100%)';


function getLetterPresences(guess: string, answer: string): LetterPresence[] {
  const answerCounts: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    const letter = answer[i];
    answerCounts[letter] = (answerCounts[letter] || 0) + 1;
  }
  const out: LetterPresence[] = Array(5).fill('absent');
  // Calculate the "correct" slots.
  for (let i = 0; i < 5; i++) {
    const guessLetter = guess[i];
    const answerLetter = answer[i];
    if (guessLetter === answerLetter) {
      out[i] = "correct";
      answerCounts[guessLetter]--;
    }
  }
  // Now calculate the "present" ones.
  for (let i = 0; i < 5; i++) {
    const guessLetter = guess[i];
    const answerLetter = answer[i];
    if (guessLetter !== answerLetter && answerCounts[guessLetter] > 0) {
      out[i] = "present";
      answerCounts[guessLetter]--;
    }
  }
  return out;
}

function pickRandomWord(): string {
  const index = Math.floor(Math.random() * WORDS.size);
  let i = 0;
  for (const word of WORDS) {
    if (i == index) {
      console.log('Answer:', word);
      return word;
    }
    i++;
  }
  throw new Error("unreachable");
}

const Index: React.FC = () => {
  const [answer, setAnswer] = useState<string>(() => pickRandomWord());
  const [guesses, setGuesses] = useState<GuessedLetter[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [turn, setTurn] = useState<number>(0);
  const [keyPresences, setKeyPresences] = useState<KeyPresences>({} as KeyPresences);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  // Focus input for hardware keyboard (optional; not critical for iOS)
  const inputRef = useRef<HTMLInputElement>(null);

  const _submitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      return;
    }
    if (!WORDS.has(currentGuess) && !OTHER_WORDS.has(currentGuess)) {
      if (window.confirm(`The word list is missing ${currentGuess}. Add it?`)) {
        WORDS.add(currentGuess);
      } else {
        return;
      }
    }

    const presences = getLetterPresences(currentGuess, answer);
    const revealed: GuessedLetter[] = presences.map((status, i) => {
      return {value: currentGuess[i], status, reveal: true};
    });
    setGuesses((prev) => [...prev, revealed]);

    // Sets the overall presence of each key. This determines the Keyboard's
    // background colors for its keys.
    setKeyPresences((prev) => {
      const copy = { ...prev };
      for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = currentGuess[i] as Key;
        const newPres = presences[i];
        const oldPres = prev[letter];
        if (oldPres === "correct") {
          continue;
        } else if (oldPres === "present" && newPres === "absent") {
          continue;
        }
        const storedPres = copy[letter];
        if (!storedPres || comparePresence(storedPres, newPres) === 1) {
          // The `=== 1` means newPres is better than the stored presence.
          copy[letter] = newPres;
        }
      }
      return copy;
    });

    if (currentGuess === answer) {
      setGameStatus("won");
    } else if (turn + 1 === NUM_TURNS) {
      setGameStatus("lost");
    }

    setTurn((prev) => prev + 1);
    setCurrentGuess("");
  };
  const cachedSubmitGuess = useCallback(_submitGuess, [turn, currentGuess, answer]);

  // Keyboard input handler
  const _handleKey = (key: Key) => {
    if (gameStatus !== "playing") return;

    if (key === "ENTER") {
      if (currentGuess.length === WORD_LENGTH) {
        cachedSubmitGuess();
      }
    } else if (key === "BACK") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    } else {
      throw new Error("unrecognized key: " + key);
    }
  };
  const cachedHandleKey = useCallback(_handleKey, [currentGuess, gameStatus, cachedSubmitGuess]);

  React.useEffect(() => {
    // HW keyboard support
    const onKeyDown = (e: KeyboardEvent) => {
      blurEverything();
      if (gameStatus !== "playing") {
        return;
      }
      if (e.key === "Enter") {
        cachedHandleKey("ENTER");
      }
      else if (e.key === "Backspace") {
        cachedHandleKey("BACK");
      } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        cachedHandleKey(e.key.toUpperCase() as Key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentGuess, gameStatus, turn, cachedHandleKey]);

  const handleRestart = () => {
    setAnswer(pickRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setTurn(0);
    setKeyPresences({} as KeyPresences);
    setGameStatus("playing");
  };

  const showVersion = () => {
    const version = import.meta.env.VITE_APP_VERSION;
    alert(`Version ${version}`);
  };

  // Compute display: up to NUM_TURNS rows + current attempt
  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-6"
      style={{ background: GRADIENT, fontFamily: "Inter, system-ui,sans-serif" }}>
      <div className="w-full py-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-0 text-whatword-title drop-shadow-sm"
            onClick={showVersion}>What Word?</h1>
      </div>
      <div className="mb-1" style={{ minHeight: 348 }}>
        <GuessesBoard guesses={guesses} currentGuess={currentGuess} turn={turn} />
        {(gameStatus === "won" || gameStatus === "lost") && (
          <div className="mt-4 flex flex-col items-center">
            <span className="text-lg md:text-xl font-semibold text-whatword-title mb-2 animate-bounce">
              {gameStatus === "won" ? "🎉 Correct!!" : `The word was: ${answer}`}
            </span>
            <button className="px-4 py-2 my-2 rounded-lg bg-whatword-accent text-white hover:bg-whatword-correct transition-all shadow-md" onClick={handleRestart}>
              New Game
            </button>
          </div>
        )}
      </div>
      <Keyboard onKey={cachedHandleKey} keyPresences={keyPresences}
                guessLength={currentGuess.length} />
      <div className="mt-8 mb-2 text-sm text-gray-400 max-w-[340px] text-center"></div>
      <input ref={inputRef} style={{ position: "absolute", left: -1000, top: -1000 }} tabIndex={-1} readOnly aria-hidden />
    </main>
  );
};

export default Index;
