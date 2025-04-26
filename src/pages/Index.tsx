import React, { useState, useRef } from "react";
import { WORDS } from "@/words";
import { WordleBoard } from "@/components/WordleBoard";
import { WordleKeyboard, Key } from "@/components/WordleKeyboard";
import { LetterPresence, GameStatus } from "@/lib/types";
import { blurEverything } from "@/lib/utils";

function getStatusForGuess(guess: string, answer: string): LetterPresence[] {
  const res: LetterPresence[] = Array(5).fill('absent');
  const answerCounts: Record<string, number> = {};
  for (let i = 0; i < 5; i++) {
    const letter = answer[i];
    answerCounts[letter] = (answerCounts[letter] || 0) + 1;
  }
  // Calculate the "correct" slots.
  for (let i = 0; i < 5; i++) {
    const guessLetter = guess[i];
    const answerLetter = answer[i];
    if (guessLetter === answerLetter) {
      res[i] = "correct";
      answerCounts[guessLetter]--;
    }
  }
  // Now calculate the "present" ones.
  for (let i = 0; i < 5; i++) {
    const guessLetter = guess[i];
    const answerLetter = answer[i];
    if (guessLetter !== answerLetter && answerCounts[guessLetter] > 0) {
      res[i] = "present";
      answerCounts[guessLetter]--;
    }
  }
  return res;
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

interface LetterState {
  value: string;
  status?: LetterPresence;
  reveal: boolean;
}

interface KeyboardStatus {
  [key: string]: LetterPresence | undefined;
}

const NUM_TURNS = 6;
const WORD_LENGTH = 5;

const Index: React.FC = () => {
  const [answer, setAnswer] = useState<string>(() => pickRandomWord());
  const [guesses, setGuesses] = useState<LetterState[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [turn, setTurn] = useState<number>(0);
  const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStatus>({});
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const revealTimeout = useRef<number>(0);

  // Focus input for hardware keyboard (optional; not critical for iOS)
  const inputRef = useRef<HTMLInputElement>(null);

  const submitGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) return;
    if (!WORDS.has(currentGuess)) {
      window.alert("Not in word list.");
      return;
    }
    const statuses = getStatusForGuess(currentGuess, answer);

    let revealed: LetterState[] = [];
    statuses.forEach((status, i) => {
      revealed.push({
        value: currentGuess[i],
        status,
        reveal: false
      });
    });
    // Poorly written reveal animation, one letter at a time supposedly.
    let idx = 0;
    function revealNext() {
      revealed = revealed.map((l, j) =>
        j === idx ? { ...l, reveal: true } : l
      );
      setGuesses((prev) => {
        const out = [...prev];
        out[out.length - 1] = revealed;
        return out;
      });
      idx++;
      if (idx < WORD_LENGTH) {
        revealTimeout.current = window.setTimeout(revealNext, 0);
      } else {
        // After full reveal, update keyboardStatus
        setKeyboardStatus((prev) => {
          const copy = { ...prev };
          for (let k = 0; k < WORD_LENGTH; ++k) {
            const letter = currentGuess[k];
            const st = statuses[k];
            const copyL = copy[letter];
            if (copyL === "correct" || (copyL === "present" && st === "absent")) {
              continue;
            }
            copy[letter] = st;
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
      }
    }
    setGuesses((prev) => [...prev, revealed]);
    revealNext();
  };

  // Keyboard input handler
  const handleKey = (key: Key) => {
    if (gameStatus !== "playing") return;

    if (key === "ENTER") {
      if (currentGuess.length === WORD_LENGTH) {
        submitGuess();
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

  React.useEffect(() => {
    // HW keyboard support
    const onKeyDown = (e: KeyboardEvent) => {
      blurEverything();
      if (gameStatus !== "playing") {
        return;
      }
      if (e.key === "Enter") {
        handleKey("ENTER");
      }
      else if (e.key === "Backspace") {
        handleKey("BACK");
      } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key.toUpperCase() as Key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentGuess, gameStatus, turn]);

  const handleRestart = () => {
    setAnswer(pickRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setTurn(0);
    setKeyboardStatus({});
    setGameStatus("playing");
    if (revealTimeout.current) {
      clearTimeout(revealTimeout.current);
    }
  };

  // Compute display: up to NUM_TURNS rows + current attempt
  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-6"
      style={{ background: "linear-gradient(0deg, rgb(190, 173, 255) 0%, rgb(241, 240, 251) 100%)", fontFamily: "Inter, system-ui,sans-serif" }}>
      <div className="w-full py-3 md:py-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-0 text-wordle-correct drop-shadow-sm">Wordle</h1>
      </div>
      <div className="mb-2" style={{ minHeight: 348 }}>
        <WordleBoard guesses={guesses} currentGuess={currentGuess} turn={turn} />
        {(gameStatus === "won" || gameStatus === "lost") && (
          <div className="mt-4 flex flex-col items-center">
            <span className="text-lg md:text-xl font-semibold text-wordle-correct mb-2 animate-bounce">
              {gameStatus === "won" ? "🎉 Correct!!" : `The word was: ${answer}`}
            </span>
            <button className="px-4 py-2 my-2 rounded-lg bg-wordle-accent text-white hover:bg-wordle-correct transition-all shadow-md" onClick={handleRestart}>
              New Game
            </button>
          </div>
        )}
      </div>
      <WordleKeyboard onKey={handleKey} keyStatus={keyboardStatus} />
      <div className="mt-8 mb-2 text-sm text-gray-400 max-w-[340px] text-center"></div>
      <input ref={inputRef} style={{ position: "absolute", left: -1000, top: -1000 }} tabIndex={-1} readOnly aria-hidden />
    </main>
  );
};

export default Index;
