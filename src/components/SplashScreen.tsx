import { useEffect, useRef, useState } from 'react';
import './SplashScreen.css';

interface SplashLetter {
  char: string;
  visible: boolean;
  activeCursor: boolean;
}

const BASE_NAME = ['P', 'R', 'A', 'T', 'Y', 'U', 'S', 'H'];
const REVEAL_DELAY = 130; // ms between letters
const CURSOR_DURATION = 300; // ms cursor blinks per letter
const TOTAL_DURATION = 3000; // fixed minimum splash duration
const FADE_DURATION = 600;

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [isPulse, setIsPulse] = useState(false);
  const [letters, setLetters] = useState<SplashLetter[]>(
    BASE_NAME.map((char) => ({ char, visible: false, activeCursor: false })),
  );
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    const runLetterReveal = (index: number) => {
      if (index >= BASE_NAME.length) {
        setLetters((prev) => prev.map((item, i, arr) => ({ ...item, activeCursor: i === arr.length - 1 })));
        setIsPulse(true);
        return;
      }

      setLetters((prev) => prev.map((item, i) => (i === index ? { ...item, visible: true, activeCursor: true } : item)));

      const cursorTimeout = window.setTimeout(() => {
        setLetters((prev) => prev.map((item, i) => (i === index ? { ...item, activeCursor: false } : item)));
      }, CURSOR_DURATION);
      timeouts.current.push(cursorTimeout);

      const nextTimeout = window.setTimeout(() => runLetterReveal(index + 1), REVEAL_DELAY);
      timeouts.current.push(nextTimeout);
    };

    runLetterReveal(0);

    const fadeTimeout = window.setTimeout(() => setIsHiding(true), TOTAL_DURATION - FADE_DURATION);
    timeouts.current.push(fadeTimeout);

    const completeTimeout = window.setTimeout(() => {
      setIsVisible(false);
      onDone();
      document.getElementById('splash-critical-css')?.remove();
    }, TOTAL_DURATION);
    timeouts.current.push(completeTimeout);

    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`splash-overlay${isHiding ? ' hiding' : ''}${isPulse ? ' pulse' : ''}`}
      aria-hidden="true"
      role="status"
      aria-live="polite"
    >
      <div className="letter-row">
        {letters.map((item, i) => (
          <div className="letter-group" key={i}>
            <span className={`letter${item.visible ? ' visible' : ''}`}>{item.char}</span>
            <span className={`cursor${item.activeCursor ? ' active' : ''}`}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
