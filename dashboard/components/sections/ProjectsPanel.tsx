"use client";

import { GlassPanel } from "@/components/hud/GlassPanel";
import { RadialGauge } from "@/components/hud/RadialGauge";
import { projects } from "@/lib/mock-data";
import type { ProjectStatus } from "@/lib/types";

const STATUS: Record<ProjectStatus, { label: string; cls: string; gauge: string }> = {
  "on-track": {
    label: "On track",
    cls: "text-success border-[rgba(91,231,196,0.35)] bg-[rgba(91,231,196,0.08)]",
    gauge: "var(--color-success)",
  },
  "at-risk": {
    label: "At risk",
    cls: "text-warn border-[rgba(255,196,107,0.35)] bg-[rgba(255,196,107,0.08)]",
    gauge: "var(--color-warn)",
  },
  blocked: {
    label: "Blocked",
    cls: "text-danger border-[rgba(255,122,138,0.35)] bg-[rgba(255,122,138,0.08)]",
    gauge: "var(--color-danger)",
  },
  shipped: {
    label: "Shipped",
    cls: "text-baby border-[rgba(124,196,255,0.35)] bg-[rgba(124,196,255,0.08)]",
    gauge: "var(--color-baby)",
  },
};

export function ProjectsPanel() {
  return (
    <GlassPanel
      label="Where everything stands"
      title="Projects & Progress"
      delay={0.1}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((p) => {
          const st = STATUS[p.status];
          return (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-lg bg-[rgba(124,196,255,0.04)] p-3.5 transition-colors hover:bg-[rgba(124,196,255,0.07)]"
            >
              <RadialGauge value={p.progress} color={st.gauge} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-display font-semibold text-ink">
                    {p.name}
                  </h3>
                  {p.kind === "main" && (
                    <span className="rounded bg-[rgba(124,196,255,0.15)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-baby">
                      Main
                    </span>
                  )}
                </div>
                <span
                  className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${st.cls}`}
                >
                  {st.label}
                </span>
                <p className="mt-1.5 truncate text-xs text-muted">
                  <span className="text-faint">Next:</span> {p.nextMilestone}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
