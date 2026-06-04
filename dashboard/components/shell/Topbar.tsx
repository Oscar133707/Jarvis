"use client";

import { useEffect, useState } from "react";
import { OWNER_NAME } from "@/lib/mock-data";

function greeting(h: number) {
  if (h < 5) return "Burning the midnight oil";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function Topbar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now?.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = now?.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="hud-label mb-1 text-baby">Jarvis · Command Center</p>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {now ? greeting(now.getHours()) : "Welcome back"},{" "}
          <span className="glow-text text-baby">{OWNER_NAME}</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-display text-2xl font-semibold tabular-nums text-ink">
            {time ?? "––:––:––"}
          </div>
          <div className="text-xs text-muted">{date ?? "Synchronizing…"}</div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[rgba(91,231,196,0.3)] bg-[rgba(91,231,196,0.08)] px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="hud-label text-success">All systems online</span>
        </div>
      </div>
    </header>
  );
}
