"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];

export function KonamiProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[step]) {
        const next = step + 1;
        setStep(next);
        if (next === KONAMI.length) {
          setActive(true);
          setStep(0);
          setTimeout(() => setActive(false), 3000);
        }
      } else {
        setStep(0);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step]);

  return (
    <>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium shadow-lg"
                role="status"
                aria-live="polite"
              >
                🎮 You found the Konami code!
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
