"use client";

import { useState } from "react";
import { Check, Flame } from "lucide-react";
import { GlassPanel } from "@/components/hud/GlassPanel";
import { habits as seedHabits, personalStats } from "@/lib/mock-data";

export function PersonalPanel() {
  const [habits, setHabits] = useState(seedHabits);
  const doneCount = habits.filter((h) => h.done).length;

  const toggle = (id: string) =>
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h)),
    );

  return (
    <GlassPanel
      label="You, today"
      title="Personal & Habits"
      delay={0.15}
      action={
        <span className="font-display text-sm font-semibold text-baby">
          {doneCount}/{habits.length}
        </span>
      }
    >
      {/* Quick personal KPIs */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {personalStats.map((s) => (
          <div
            key={s.id}
            className="rounded-lg bg-[rgba(124,196,255,0.04)] p-2.5 text-center"
          >
            <div className="font-display text-xl font-bold text-ink">
              {s.value}
            </div>
            <div className="hud-label mt-0.5">{s.label}</div>
            {s.hint && (
              <div className="mt-0.5 text-[10px] text-faint">{s.hint}</div>
            )}
          </div>
        ))}
      </div>

      {/* Daily checklist */}
      <ul className="flex flex-col gap-1.5">
        {habits.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => toggle(h.id)}
              className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-[rgba(124,196,255,0.06)]"
            >
              <span
                className={`grid h-5 w-5 place-items-center rounded-md border transition-all ${
                  h.done
                    ? "border-success bg-[rgba(91,231,196,0.18)] text-success"
                    : "border-[rgba(124,196,255,0.3)] text-transparent group-hover:border-baby"
                }`}
              >
                <Check size={13} strokeWidth={3} />
              </span>
              <span
                className={`flex-1 text-sm transition-colors ${
                  h.done ? "text-muted line-through" : "text-ink"
                }`}
              >
                {h.label}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-warn">
                <Flame size={12} />
                {h.streak}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}
