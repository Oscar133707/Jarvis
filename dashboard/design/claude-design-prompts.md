# Claude Design — Jarvis Dashboard prompts

Polished prompts for generating the Jarvis dashboard in **Claude Design**, then handing the result back to
this codebase. Use the **master prompt** first to establish the look + shell, then the **per-section prompts**
to refine individual panels.

### How to use
1. In Claude Design, start a project and **link this repo** (`dashboard/`) so it inherits the tokens in
   `app/globals.css` and the conventions in `CLAUDE.md`.
2. Paste the **master prompt**. Review the canvas.
3. Iterate: broad changes via chat, pixel-level tweaks via **inline comments**.
4. Refine a panel with its **per-section prompt**.
5. **Export → Send to Claude Code** to build/refine it here. The bundle's tokens map onto our `@theme` names.

> Keep the north star in every prompt: **"Iron Man / J.A.R.V.I.S. command center, reimagined as a calm,
> premium, daily-use product — baby blue, not the movie's cyan/red. A few cinematic hero moments, everything
> else instantly readable. Beautiful on desktop AND phone."**

---

## 1 · Master prompt (design system + shell)

> **JARVIS — a personal AI operating-system dashboard.** Design a premium, daily-use command center for a
> founder who runs several businesses at once and is constantly context-switching. Jarvis and its specialist
> agents do the work; this dashboard is where the founder glances each morning to see only what needs them.
> Inspiration: the Iron Man / J.A.R.V.I.S. interface — but reimagined as a **calm, readable product**, not a
> noisy movie HUD. It must look just as good on a **phone** as on desktop.
>
> **Aesthetic.** Dark, cinematic, glassmorphic. A deep near-black navy canvas (`#06090F`) with a faint blue
> blueprint grid and very subtle scanlines. Frosted dark-glass panels (`#0d1424`, ~65% opacity, backdrop blur)
> with thin glowing **baby-blue** borders, a soft outer glow, and occasional HUD corner-brackets on hero
> panels. Generous negative space, high contrast, nothing cluttered.
>
> **Color.** Signature accent **baby blue `#7CC4FF`**, with brighter cyan-blue `#5BA8FF` for active/glow states
> and soft `#A8D8FF` for highlights — **never** the movie's harsh cyan or red. Text: `#E8F1FF` primary,
> `#8A9BB8` muted, `#4A5A78` faint. Status: green `#5BE7C4` (good), amber `#FFC46B` (attention),
> red `#FF7A8A` (escalation). Use status colors sparingly, as accents only.
>
> **Type.** Geometric techy display face (**Chakra Petch**, or Rajdhani) for headings, numbers, and uppercase
> micro-labels; **Inter** for body. Micro-labels are uppercase with wide letter-spacing (~0.18em).
>
> **Signature "hero" moments (only these — keep the rest calm):** a central **arc-reactor status orb** that
> softly pulses and has slow counter-rotating HUD rings (overall system health); **radial progress gauges**;
> and a brief **boot-up reveal** ("JARVIS… initializing core… all systems nominal") that fades into the
> dashboard. Animations are smooth and understated; respect reduced-motion.
>
> **Layout.** A persistent **left rail** (arc-reactor "J" logo + icon nav: Overview, Alerts, Projects,
> Personal, Comms) that becomes a **bottom tab bar on mobile**. A **top bar** with a time-aware greeting, a
> live clock + date, and an "all systems online" pulse. The main canvas is a responsive **bento grid** of
> glass panels. On phone everything collapses to a single thumb-reachable column.
>
> **Sections to design** (detailed prompts follow): Overview hero, Alerts & Escalations, Projects & Progress,
> Personal & Habits, and Comms (Slack hub). Design the full shell + all five now; we'll refine each next.
>
> Make it feel like something the owner is *excited* to open every day — confident, expensive, and effortless.

---

## 2 · Per-section prompts

### Overview (hero)
> Design the **Overview hero** for the Jarvis dashboard. A wide hero glass panel with HUD corner-brackets.
> On the left, the **arc-reactor status orb** (pulsing core, "96% ONLINE", slow rotating rings). On the right,
> a row of 4 quick-glance stat tiles — Agents active, Alerts open, Projects on-track, Slack unread — each a big
> Chakra-Petch number in baby blue over an uppercase micro-label. Above it, a time-aware greeting ("Good
> morning, Oscar") with a live clock + date and an "all systems online" green pulse. Calm, spacious, cinematic.

### Alerts & Escalations
> Design the **Alerts & Escalations** panel — the prioritized inbox of things that actually need the founder.
> Each alert: a severity indicator (red critical / amber needs-you / blue FYI) as a left accent bar + dot +
> uppercase tag, a bold title, one line of detail, the source (which agent + Slack channel raised it, e.g.
> "Tom · #dev"), a relative timestamp, and two quiet actions ("Review", "Dismiss"). Severity sets the accent
> only — keep the card itself dark glass. This is a hero panel; make scanning instant. Show ~4 alerts.

### Projects & Progress
> Design the **Projects & Progress** panel. A 2-column grid of project cards (main project badged "MAIN").
> Each card: a **radial progress gauge** (color = status: green on-track, amber at-risk, red blocked, blue
> shipped), the project name in Chakra Petch, a small status pill, the responsible agent, and a "Next: <next
> milestone>" line. Compact, glanceable, satisfying gauges that animate up on load.

### Personal & Habits
> Design the **Personal & Habits** panel — the founder's daily self-check. Top: a row of 4 personal KPI tiles
> (Focus today, Inbox needs-you, Habits done, top Streak). Below: an interactive **daily checklist** (e.g.
> "Took creatine", "Morning workout", "Deep work 2h") with custom baby-blue check boxes; checked items get a
> green check + strikethrough. Each row shows a small flame + day-streak count. Warm and motivating, still on-brand.

### Comms · Slack hub
> Design the **Comms (Slack) hub** — how the founder reaches and talks to the agents without leaving the
> dashboard. Two columns: (left) a **channel list** (#main-project, #dev, #ads, #customer-reviews) each with a
> hash icon, the agent living there (e.g. "Tom" with a small bot icon), a one-line last-message preview, and an
> unread badge; (right) the selected channel's recent agent message as a chat bubble, plus a **message
> composer** (text field + baby-blue send button) and an "Open in Slack ↗" link. Selecting a channel highlights
> it with the active-glass treatment. Make it feel like a calm mini-Slack, not a full client.

---

## 3 · Refinement prompts (chat / inline)
- "Increase negative space and reduce the number of glows — keep glow only on the arc reactor, active nav, and primary buttons."
- "Make the phone layout a single column; the left rail becomes a 5-icon bottom bar."
- "Add a thin animated scan-line sweep across hero panels every few seconds, very subtle."
- "Tone the baby blue slightly softer and raise body-text contrast for readability."
- "Show empty/zero states (no alerts → 'All clear, Jarvis has it')."

## 4 · Handoff note
When it looks right, **Export → Send to Claude Code**. Ask Claude Code to map the design onto the existing
structure: tokens → `app/globals.css` `@theme`; panels → `components/sections/*` wrapped in `GlassPanel`;
primitives → `components/hud/*`; keep data coming from `lib/mock-data.ts` (`lib/types.ts` shapes). Reference
`CLAUDE.md` so naming and conventions stay consistent.
