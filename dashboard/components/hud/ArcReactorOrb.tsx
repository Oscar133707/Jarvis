"use client";

import { motion } from "framer-motion";

interface ArcReactorOrbProps {
  size?: number;
  /** 0–100 overall system health; drives the ring fill. */
  health?: number;
  label?: string;
}

/**
 * The signature Jarvis hero element: a pulsing arc-reactor orb with rotating
 * HUD rings. Used for overall "system online" status.
 */
export function ArcReactorOrb({
  size = 132,
  health = 96,
  label = "ONLINE",
}: ArcReactorOrbProps) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const dash = (health / 100) * c;

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        {/* faint track */}
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(124,196,255,0.12)"
          strokeWidth="3"
        />
        {/* health arc */}
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--color-baby)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform="rotate(-90 60 60)"
          style={{ filter: "drop-shadow(0 0 6px rgba(124,196,255,0.8))" }}
        />

        {/* slow rotating dashed ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="rgba(124,196,255,0.35)"
          strokeWidth="1"
          strokeDasharray="2 8"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        />
        {/* counter-rotating tick ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="38"
          fill="none"
          stroke="rgba(168,216,255,0.25)"
          strokeWidth="1"
          strokeDasharray="1 6"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        />
      </svg>

      {/* pulsing core */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7], scale: [0.96, 1, 0.96] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid h-1/2 w-1/2 place-items-center rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,216,255,0.95) 0%, rgba(91,168,255,0.55) 45%, rgba(91,168,255,0) 72%)",
          boxShadow: "0 0 28px 4px rgba(91,168,255,0.5)",
        }}
      >
        <div className="text-center leading-none">
          <div className="font-display text-base font-bold text-white">
            {health}
            <span className="text-[10px]">%</span>
          </div>
          <div className="mt-0.5 text-[8px] font-semibold tracking-[0.2em] text-white/80">
            {label}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
