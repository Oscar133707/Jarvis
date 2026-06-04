"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/lib/nav";

/** Scroll-spy: returns the id of the section currently in view. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function Sidebar() {
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="glass fixed inset-x-3 bottom-3 z-30 flex items-center justify-around gap-1 rounded-2xl p-2
                 md:inset-x-auto md:bottom-auto md:left-4 md:top-4 md:h-[calc(100vh-2rem)] md:w-20
                 md:flex-col md:justify-start md:gap-2 md:py-5"
    >
      {/* Arc-reactor mini logo (desktop only) */}
      <div className="mb-2 hidden md:block">
        <div
          className="grid h-10 w-10 place-items-center rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(168,216,255,0.9), rgba(91,168,255,0.2) 60%, transparent 72%)",
            boxShadow: "0 0 18px 2px rgba(91,168,255,0.45)",
          }}
        >
          <span className="font-display text-xs font-bold text-white">J</span>
        </div>
      </div>

      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex w-full flex-col items-center gap-1 rounded-xl px-2 py-2 transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="nav-active"
                className="glass-active absolute inset-0 rounded-xl"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon
              size={20}
              className={`relative z-10 transition-colors ${
                isActive ? "text-baby" : "text-muted group-hover:text-accent-soft"
              }`}
            />
            <span
              className={`relative z-10 text-[9px] font-semibold uppercase tracking-wider transition-colors ${
                isActive ? "text-baby" : "text-faint group-hover:text-muted"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
