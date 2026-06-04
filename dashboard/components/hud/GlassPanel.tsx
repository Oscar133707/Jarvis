"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassPanelProps {
  /** Small uppercase micro-label above the title. */
  label?: string;
  /** Panel heading. */
  title?: string;
  /** Optional element rendered on the right of the header (count, button…). */
  action?: ReactNode;
  /** Adds corner brackets + brighter edge for a "hero" panel. */
  hero?: boolean;
  /** Stagger delay (seconds) for the entrance animation. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function GlassPanel({
  label,
  title,
  action,
  hero = false,
  delay = 0,
  className = "",
  children,
}: GlassPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass ${hero ? "glass-active hud-corners" : ""} relative flex flex-col p-5 ${className}`}
    >
      {(label || title || action) && (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {label && <p className="hud-label">{label}</p>}
            {title && (
              <h2 className="font-display text-lg font-semibold text-ink">
                {title}
              </h2>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.section>
  );
}
