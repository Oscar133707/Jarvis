"use client";

import { motion } from "framer-motion";

interface RadialGaugeProps {
  value: number; // 0–100
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
}

/** Circular progress gauge — used on project cards. */
export function RadialGauge({
  value,
  size = 64,
  stroke = 6,
  color = "var(--color-baby)",
  label,
}: RadialGaugeProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(124,196,255,0.12)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ filter: "drop-shadow(0 0 4px rgba(124,196,255,0.5))" }}
        />
      </svg>
      <div className="absolute text-center leading-none">
        <span className="font-display text-sm font-bold text-ink">{value}</span>
        {label && (
          <span className="block text-[8px] tracking-wider text-muted">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
