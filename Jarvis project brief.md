# Jarvis — Project Brief

## What is Jarvis?

Jarvis is not an app. It is a personal AI operating system built and trained around a specific person's life and business. It cannot be installed — it must be built and customized.

The goal: instead of the user constantly switching between projects and tasks, Jarvis and its specialist agents do the context-switching. The user only gets pulled in when something actually needs them.

---

## Architecture

### The Reasoning Core
- Central LLM orchestrator (Claude via Anthropic API)
- Coordinates all specialist agents
- Receives input from communication channels and routes tasks

### Specialist Agents
Each agent has its own context, skills, and set of tools. They work independently and in parallel.

Example agents:
- **Sarah** — customer support agent
- **Tom** — dev/engineering agent
- **Ads agent** — manages Meta Ads, monitors performance
- **Email agent** — handles Gmail
- **Content agent** — manages Instagram

### Tools (connected to agents)
- Gmail
- Instagram
- Meta Ads
- Analytics tools
- GitHub (pull requests, code review)

### Communication Channels
- **Slack** — the primary workspace where real work happens
- **iMessage** — user-facing communication channel
- **Voice** — optional input channel

---

## How It Works (Day-to-Day)

Slack is the backbone. Each business function or project has its own channel. Agents live in these channels and act autonomously.

### Example flow:
1. Sarah (support agent) spots a bug reported by a user
2. Sarah escalates to `#dev` channel
3. Tom (dev agent) investigates, decides if it should be implemented
4. Tom gets approval, works through the issue
5. Tom submits a pull request for review

The user only sees what needs their attention — everything else is handled.

### Slack channel structure:
- `#main-project` — primary focus
- `#side-project-1` — agent handles routine tasks
- `#side-project-2` — agent handles routine tasks
- `#ads` — ad performance monitoring
- `#customer-reviews` — review monitoring and responses
- `#emails` — email triage and drafting
- `#dev` — engineering tasks and PRs

---

## The User's Core Problem

The user has multiple projects running simultaneously and cannot give full attention to the main one because of constant context-switching between side projects.

**Solution:** Each side project gets its own Slack channel + dedicated agent. The agent handles routine tasks (emails, updates, monitoring, posting) and only escalates to the user when a real decision is needed.

---

## Project Structure (to build in Claude Code)

```
jarvis-projekt/
├── JARVIS_PROJECT_BRIEF.md     ← this file
├── dashboard/                  ← personal dashboard (HTML/React)
│   └── index.html
├── orchestrator/               ← central LLM logic
│   └── index.js
├── agents/                     ← individual specialist agents
│   ├── sarah.js                (customer support)
│   ├── tom.js                  (dev agent)
│   └── ads.js                  (ads agent)
├── tools/                      ← tool integrations
│   ├── gmail.js
│   ├── instagram.js
│   └── slack.js
├── channels/                   ← Slack channel configs
│   └── config.json
└── .env                        ← API keys (never commit this)
```

---

## Dashboard Requirements

A personal Jarvis dashboard that serves two purposes:

### 1. Jarvis OS View
- Overview of all active agents and their status
- Live Slack channel activity per project
- Alerts and escalations that need user attention

### 2. Daily Personal Dashboard
- Project progress tracking (main project + side projects)
- Daily task checklist (e.g. "Did I take my creatine today?")
- Habit tracking
- Quick-glance status for everything

### Design direction
- Strong Jarvis / Iron Man aesthetic
- Dark, techy, but with a personal touch
- Should feel like something the user actually wants to open every day

---

## Tech Stack (suggested)

| Layer | Tool |
|---|---|
| LLM | Claude API (claude-sonnet-4-20250514) |
| Agent framework | MCP servers or custom agent loop |
| Slack integration | Slack Bolt SDK |
| iMessage | Twilio or Apple Shortcuts |
| Frontend dashboard | React or plain HTML/CSS/JS |
| Gmail | Gmail MCP server |
| Instagram | Instagram Graph API |

---

## Build Order (recommended)

1. **Slack bot layer** — the backbone everything runs through
2. **Central orchestrator** — routes messages to the right agent
3. **First agent (email or support)** — simplest to test
4. **Dashboard** — visual layer on top of what's already running
5. **More agents** — add one at a time as the system stabilizes

---

## API Keys needed

- `ANTHROPIC_API_KEY` — Claude API
- `SLACK_BOT_TOKEN` — Slack Bolt
- `SLACK_SIGNING_SECRET` — Slack Bolt
- `GMAIL_CLIENT_ID` / `GMAIL_CLIENT_SECRET` — Gmail OAuth
- `INSTAGRAM_ACCESS_TOKEN` — Instagram Graph API
- `META_ADS_TOKEN` — Meta Ads API

Store all in `.env`, never commit to git.

---

*Generated from project brief conversation on 2026-06-04*