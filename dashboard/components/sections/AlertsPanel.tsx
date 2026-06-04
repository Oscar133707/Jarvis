"use client";

import { GlassPanel } from "@/components/hud/GlassPanel";
import { alerts } from "@/lib/mock-data";
import type { Severity } from "@/lib/types";

const SEV: Record<
  Severity,
  { dot: string; text: string; ring: string; label: string }
> = {
  critical: {
    dot: "bg-danger",
    text: "text-danger",
    ring: "border-l-danger",
    label: "Critical",
  },
  warning: {
    dot: "bg-warn",
    text: "text-warn",
    ring: "border-l-warn",
    label: "Needs you",
  },
  info: {
    dot: "bg-baby",
    text: "text-baby",
    ring: "border-l-baby",
    label: "FYI",
  },
};

export function AlertsPanel() {
  const open = alerts.length;
  return (
    <GlassPanel
      hero
      label="Needs your attention"
      title="Alerts & Escalations"
      delay={0.05}
      action={
        <span className="font-display text-sm font-semibold text-danger">
          {open} open
        </span>
      }
    >
      <ul className="flex flex-col gap-3">
        {alerts.map((a) => {
          const s = SEV[a.severity];
          return (
            <li
              key={a.id}
              className={`rounded-lg border-l-2 bg-[rgba(124,196,255,0.04)] p-3 ${s.ring} transition-colors hover:bg-[rgba(124,196,255,0.07)]`}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                  <span className={`hud-label ${s.text}`}>{s.label}</span>
                </div>
                <span className="text-[11px] text-faint">{a.raisedAt}</span>
              </div>
              <p className="text-sm font-semibold text-ink">{a.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">
                {a.detail}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-faint">{a.source}</span>
                <div className="flex gap-1.5">
                  <button className="rounded-md border border-[rgba(124,196,255,0.35)] px-2.5 py-1 text-[11px] font-medium text-baby transition-colors hover:bg-[rgba(124,196,255,0.12)]">
                    Review
                  </button>
                  <button className="rounded-md px-2.5 py-1 text-[11px] font-medium text-muted transition-colors hover:text-ink">
                    Dismiss
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </GlassPanel>
  );
}
