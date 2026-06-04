# Jarvis — Dashboard

The personal **Jarvis OS** dashboard. Iron Man / J.A.R.V.I.S. aesthetic, baby-blue, calm-but-cinematic.
This is the **v1 UI foundation** — built so a [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)
handoff lands cleanly on top of it. All data is currently **mock** (`lib/mock-data.ts`); the backend comes later.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

`npm run build && npm run start` for a production build.

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind v4 · framer-motion · lucide-react.
See [`CLAUDE.md`](./CLAUDE.md) for design tokens and component conventions.

## Sections (v1)
- **Overview** — arc-reactor system orb + quick stats.
- **Alerts & Escalations** — prioritized inbox of things that need you.
- **Projects & Progress** — main + side projects with radial gauges.
- **Personal & Habits** — daily checklist + streaks + KPIs.
- **Comms · Slack** — channel list with "open in Slack" deep-links + a message composer (mock send).

## Deploy to Vercel
1. Push this folder to a Git repo.
2. In Vercel → **New Project** → import the repo. If the app isn't at the repo root, set
   **Root Directory** = `dashboard`. Framework auto-detects as Next.js.
3. Add env vars from [`.env.example`](./.env.example) (at minimum `NEXT_PUBLIC_SLACK_TEAM_ID` for working
   Slack links). Deploy — open it on your phone.

CLI alternative: `npx vercel` from this folder.

## Design with Claude Design
Open [Claude Design](https://claude.ai), link this repo so it inherits the tokens in `globals.css`, then paste
a prompt from [`design/claude-design-prompts.md`](./design/claude-design-prompts.md). Use **Send to Claude Code**
to hand the result back here.

## Next phases (not built yet)
Slack Bolt backbone → orchestrator (Claude Agent SDK) → first agent → wire the dashboard to real data via
`app/api/*` route handlers (Slack/Gmail/Ads). `lib/types.ts` shapes and `lib/slack.ts` stubs are ready for this.
