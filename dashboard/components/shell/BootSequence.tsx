"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArcReactorOrb } from "@/components/hud/ArcReactorOrb";

const LINES = [
  "Initializing reasoning core…",
  "Connecting specialist agents…",
  "Syncing Slack channels…",
  "All systems nominal.",
];

/** Brief cinematic "JARVIS online" reveal shown on load, then it fades away. */
export function BootSequence() {
  const [done, setDone] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }
    const ticks = LINES.map((_, i) =>
      setTimeout(() => setLine(i), 350 + i * 420),
    );
    const end = setTimeout(() => setDone(true), 2500);
    return () => {
      ticks.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setDone(true)}
          className="fixed inset-0 z-50 grid cursor-pointer place-items-center bg-bg"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ArcReactorOrb size={150} health={96} label="BOOT" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glow-text font-display text-4xl font-bold tracking-[0.4em] text-ink"
            >
              JARVIS
            </motion.h1>
            <div className="h-5 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={line}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hud-label text-baby"
                >
                  {LINES[line]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
