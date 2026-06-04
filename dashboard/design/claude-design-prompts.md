# Claude Design — Jarvis Dashboard prompts

Two master prompts: **CINEMATIC** (the full sci-fi HUD experience you want) and **REFINED** (the cleaner version).
Start with CINEMATIC. Hand the result back to Claude Code via Export → Send to Claude Code.

---

## ★ MASTER PROMPT — CINEMATIC HUD (use this one)

> Design a full-screen, cinematic **J.A.R.V.I.S. command center** for a founder named Oscar who runs multiple
> businesses through AI agents. This is NOT a SaaS dashboard. It is a **sci-fi holographic war room** — the
> kind of thing Tony Stark would open every morning. Every pixel should feel like it belongs in a blockbuster.
>
> ---
>
> **THE CENTRAL HERO — the globe orb.**
> Dominate the center of the screen with a massive **holographic globe/sphere** — a glowing, slowly rotating
> 3D-looking orb made of particle dots and wireframe longitude/latitude lines, with concentric rings orbiting
> it at different speeds. This is the soul of the dashboard. Make it breathtaking: deep glowing core
> (`#5BA8FF`), particle field, outer rings with tick marks, a faint grid of light radiating outward from it.
> It should glow softly and fill at least 40% of the vertical height. Around it, thin animated orbit paths
> with nodes representing each agent (Sarah, Tom, Ads, Email, Content) slowly moving along their paths.
>
> **FULL-SCREEN HUD LAYOUT — no traditional panels.**
> The entire dark canvas IS the interface. No white. No cards with rounded corners. Everything is inset into
> the dark space as floating data clusters, connected by thin glowing lines to the central orb.
> - **Left column** — "SYSTEM VITALS" block: neural core %, memory, latency, agent statuses — rendered as
>   monospaced terminal-style readouts with live-updating numbers. Below it, a scrolling **TELEMETRY FEED**
>   of agent activity logs (raw, like a terminal: timestamps + short log lines).
> - **Right column** — mission-critical stats: 4 large number readouts (Agents active, Alerts open, Projects
>   on-track, Slack unread), each in Chakra Petch with a unit label and a thin horizontal sparkline bar below.
>   Below that, **project status** rendered as horizontal progress bars with percentage, not cards.
> - **Bottom strip** — a wide status bar spanning the full width: left = coordinates/session ID (fake, for
>   aesthetic), center = "OSCAR · COMMAND SESSION ACTIVE" with a pulsing dot, right = large live clock `HH:MM:SS`.
> - **Top bar** — thin header: left = `J.A.R.V.I.S. — JUST A RATHER VERY INTELLIGENT SYSTEM` in small caps,
>   right = date + status tags (`SECURE`, `ENCRYPTED`, `AUTO-LYLE` style toggle pills).
>
> **COLOR — baby blue electric, not the movie's red/gold.**
> Canvas: near-black `#06090F`. Everything glows in **baby blue `#7CC4FF`** and electric `#5BA8FF`.
> The globe core pulses between `#A8D8FF` (bright) and `#3A7FCC` (deep). Particle field is `#7CC4FF` at
> low opacity, rings are bright baby blue with glow. Text is `#E8F1FF`. Muted text `#8A9BB8`. Status:
> green `#5BE7C4`, amber `#FFC46B`, red `#FF7A8A` — used sparingly only for alert severity dots.
> The overall feel is **electric blue on deep black, like a hologram projected in a dark room**.
>
> **TEXTURE + ATMOSPHERE.**
> - Faint horizontal scanlines across the entire screen (1px lines, very low opacity).
> - Blueprint grid in the background, barely visible, slightly denser near the orb.
> - Strong radial glow emanating from the globe center, fading into darkness at the edges.
> - All glowing elements have a soft `box-shadow`/`drop-shadow` bloom effect.
> - Thin `1px` lines in baby blue connecting the orb to satellite data clusters.
> - Corner brackets `⌐ ¬` on the outermost frame of the screen (not on cards — on the viewport itself).
>
> **TYPOGRAPHY — monospaced meets geometric.**
> - `Chakra Petch` or `Share Tech Mono` for all numbers, stats, log lines, coordinates.
> - `Inter` for readable body text only where absolutely necessary.
> - ALL section labels uppercase, wide-tracked, tiny: `SYSTEM VITALS`, `TELEMETRY`, `MISSION STATUS`.
> - Large hero numbers (clock, key stats) should be enormous — 4–6rem — and baby blue with glow.
>
> **ANIMATIONS (describe as if they're running).**
> - Globe slowly rotates, particle field shimmers, rings spin at different speeds.
> - Telemetry feed scrolls upward continuously like a live terminal.
> - Numbers in the vitals column flicker/update like live sensor readings.
> - Agent nodes pulse briefly when "active".
> - A **boot sequence overlay** on load: `INITIALIZING REASONING CORE…` → `SYNCING AGENTS…` → `ALL SYSTEMS
>   NOMINAL` in white monospace text, one line at a time, then dissolves into the dashboard.
>
> **ALERTS — no cards, just a priority queue.**
> Below the right column vitals: a slim `PRIORITY QUEUE` section. Each alert is one line:
> `● CRITICAL  Refund spike on main store  Sarah · 8m ago  [REVIEW]`
> Severity dot color only. Everything else is small, dense, terminal-style. Four alerts max.
>
> **HABITS / PERSONAL — integrated, not a separate panel.**
> Bottom-left corner: a small `DAILY PROTOCOL` block. Checklist items are single lines with a `[ ]` or `[✓]`
> prefix in monospace. Streak shown as `🔥 12`. Compact, feels like mission objectives.
>
> **COMMS — a slim channel selector.**
> Bottom-right: `COMM CHANNELS` — a vertical list of channel names with unread badges, and a one-line message
> input. Minimal. Feels like a radio channel selector on a spacecraft.
>
> ---
>
> Make it feel like a **living, breathing holographic system** — not a website. The founder should feel like
> they're looking at the real Iron Man interface when they open it. Jaw-dropping on first load.

---

## MASTER PROMPT — REFINED (cleaner fallback)

> Design a premium, daily-use **J.A.R.V.I.S. command center** for a founder named Oscar. Inspiration: Iron Man
> HUD — reimagined as a calm, readable product (not a noisy movie HUD). Dark glassmorphic, baby blue
> `#7CC4FF`, Chakra Petch display font, Inter body. Canvas `#06090F`, frosted panels, thin glowing borders.
> Hero moments only: a central pulsing **arc-reactor orb** with rotating rings, **radial progress gauges**,
> boot-up reveal. Left rail nav (Overview, Alerts, Projects, Personal, Comms) → bottom tab bar on mobile.
> Sections: Overview hero orb + 4 stat tiles; Alerts inbox with severity bars; Projects grid with radial
> gauges; Personal habits checklist + KPIs; Slack comms hub with channel list + composer. Calm, spacious,
> premium. Mobile-first.

---

## Cinematic follow-up prompts (paste these after the main build to push further)

- "Make the central globe 30% larger and add more particle density — it should feel like looking at a real hologram."
- "Make the telemetry feed on the left scroll continuously upward like a live terminal. Add more log lines."
- "Add thin glowing lines connecting the central orb to each data cluster, like a circuit board."
- "The background is too bright — darken the canvas to pure `#04060C` and increase the contrast of all glowing elements."
- "Add a very faint pulsing radial shockwave ring that expands from the globe center every 4 seconds."
- "Make the clock in the bottom-right enormous — 5rem — and add milliseconds ticking."
- "Add agent orbit nodes around the globe: 5 small dots (Sarah, Tom, Ads, Email, Content) slowly moving on elliptical paths."
- "The boot sequence should feel more dramatic: each line types out letter by letter before the next appears."

---

## Handoff to Claude Code
When it looks right → **Export → Send to Claude Code**. Tell Claude Code: map tokens onto `app/globals.css`
`@theme`, rebuild the layout in `app/page.tsx`, replace globe with `components/hud/ArcReactorOrb.tsx` or a new
`GlobeOrb` component, keep data from `lib/mock-data.ts`. Reference `CLAUDE.md` for naming conventions.
