@AGENTS.md

# Jarvis Dashboard — conventions

The personal Jarvis OS dashboard. **Iron Man / J.A.R.V.I.S. aesthetic, baby-blue, calm-but-cinematic.**
This file is the contract for anyone (including Claude Design handoffs) adding to the UI — match it so
generated code drops in consistently.

## Stack
- **Next.js 16 (App Router) + TypeScript**, **Tailwind CSS v4**, **framer-motion**, **lucide-react**.
- Deployed on **Vercel**. Must look great on **phone** (mobile-first) as well as desktop.
- ⚠️ Next 16 has breaking changes vs. older versions — see `AGENTS.md`; read `node_modules/next/dist/docs/`
  before using unfamiliar APIs. `params`/`searchParams`/`cookies`/`headers` are **async**.

## Design tokens — single source of truth
Defined once in `app/globals.css` under `@theme`. **Never hard-code hex values in components** — use the
Tailwind utilities these generate. Claude Design handoffs should map their tokens onto these names.

| Utility | Token | Meaning |
|---|---|---|
| `bg-bg` `bg-bg-2` | `--color-bg` / `-2` | near-black navy canvas |
| `bg-panel` | `--color-panel` | panel base |
| `text-baby` `bg-baby` `border-baby` | `--color-baby` `#7cc4ff` | **signature accent** |
| `text-glow` | `--color-glow` `#5ba8ff` | active/glow |
| `text-accent-soft` | `--color-accent-soft` | soft highlight |
| `text-ink` | `--color-ink` | primary text |
| `text-muted` `text-faint` | `--color-muted` / `--color-faint` | secondary / tertiary |
| `text-success` `text-warn` `text-danger` | status | green / amber / red |
| `font-display` | Chakra Petch | headers, stats, labels |
| `font-sans` | Inter | body (default) |

Reusable CSS helpers (also in `globals.css`): `.glass`, `.glass-active`, `.hud-label`, `.glow-text`,
`.hud-corners`. Prefer these over re-implementing the frosted-glass look.

## Component conventions
- **Location:** `components/hud/` (primitives), `components/shell/` (chrome), `components/sections/` (panels).
- **Naming:** `PascalCase.tsx`, named exports (not default), one component per file.
- **Client vs server:** add `"use client"` only when a component uses hooks, state, events, or `framer-motion`.
  Pages stay server components and compose client pieces.
- **Panels:** wrap every dashboard section in `<GlassPanel label title action hero delay>` for a consistent
  frame, header, and entrance animation. Don't build bespoke panel chrome.
- **Data:** components read from `lib/mock-data.ts`; shapes live in `lib/types.ts`. When the backend lands,
  swap the imports for fetches to `app/api/*` route handlers — keep the `types.ts` shapes stable.
- **Imports:** use the `@/*` alias (e.g. `@/components/hud/GlassPanel`).
- **Animation:** keep it calm. Hero moments only (arc-reactor orb, radial gauges, boot reveal). Respect
  `prefers-reduced-motion` (handled globally in `globals.css`).
- **Icons:** `lucide-react`.

## Layout
Single-page Overview (`app/page.tsx`): `Topbar` + hero, then a `lg:grid-cols-12` bento of section panels.
`Sidebar` is a left rail on `md+` and a bottom tab bar on mobile; it scroll-spies the section anchor ids
(`overview`, `alerts`, `projects`, `personal`, `comms` — defined in `lib/nav.ts`).

## Slack
`lib/slack.ts` holds deep-link helpers + a mock `sendToChannel`. Full Slack can't be iframed. Real
read/send will be a `app/api/slack/*` route handler using a bot token (server-only — never expose it).
