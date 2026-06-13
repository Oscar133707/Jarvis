# Jarvis — Backend

The reasoning core of Jarvis: an orchestrator + specialist agents that live in **Slack**, working
**per project** and grounded in each project's **Obsidian knowledge base**.

You `@mention` or DM **Jarvis**; it reasons as your chief of staff, reads the project's vault, and delegates
to specialists (Sarah, Tom, Ads, Email, Content) when a task needs their depth.

## Setup & run
1. Follow **[SETUP.md](./SETUP.md)** to get an Anthropic key + create the Slack app (~10 min).
2. `cp .env.example .env` and fill in the values.
3. Install + run:
   ```bash
   npm install
   npm run dev
   ```
   You'll see `⚡ Jarvis online`. Message Jarvis in a project channel, or DM it.

`JARVIS_DEBUG=1 npm run dev` prints the underlying SDK stderr for debugging.

## Projects & knowledge bases
- **Each project = one Slack channel + one folder in [`../vault/`](../vault/)** (an Obsidian vault).
  A folder is a project when it has `_project.md` with frontmatter `name:` + `slackChannel:`.
- Multiple projects run **in parallel** — each channel drives its own isolated, concurrent `runJarvis()`.
- For a project message, agents run **inside that project's vault**: they **read** the core docs
  (`brief.md`, `brand.md`, `customer.md`, …) and **write** new findings/decisions into `notes/` — the
  growing per-project memory. Writes outside `notes/` are denied (`src/lib/permissions.ts`).
- **Start a new project live** (no restart): create the channel + `/invite @Jarvis`, add `vault/<slug>/_project.md`.
- DMs use the general context (`vault/_general/`). See [`../vault/README.md`](../vault/README.md).

## Architecture
```
Slack channel  ──► listeners resolve channel → project (../vault/<slug>/)
(or DM → _general)        │
                          ▼
                   runJarvis({ text, project })   src/orchestrator/jarvis.ts
                          │  cwd = project vault; reads it; writes notes/ (via canUseTool)
                          ▼  delegates via the Agent tool
                   specialist subagents (read the same vault)   src/agents/*
```
- **Grounded + scoped:** project runs use `allowedTools: ["Agent","Read","Grep","Glob"]` + a `canUseTool`
  callback that allows writes only under `<vault>/notes/`. Unregistered channels fall back to a sandboxed,
  reasoning-only Jarvis (`allowedTools: ["Agent"]`, `permissionMode: "dontAsk"`).
- **Models:** orchestrator uses `JARVIS_MODEL` (default `sonnet`); specialists `inherit` it.

## Project layout
| Path | Role |
|---|---|
| `src/index.ts` | boot: validate env → register listeners → start Socket Mode |
| `src/lib/env.ts` | load + validate env vars (incl. `VAULT_DIR`) |
| `src/lib/permissions.ts` | `canUseTool` — read vault, write only `notes/` |
| `src/slack/app.ts` | Bolt app (Socket Mode) |
| `src/slack/listeners.ts` | `app_mention` + DM → resolve project → orchestrator → reply |
| `src/slack/format.ts` | strip mentions, build thread-history context |
| `src/orchestrator/jarvis.ts` | `runJarvis()` — one (project-aware) orchestrator turn |
| `src/agents/personas.ts` | system prompts for Jarvis + each specialist |
| `src/agents/definitions.ts` | `AgentDefinition` map (the subagents) |
| `src/projects/registry.ts` | scan `vault/*/_project.md`, resolve channel → project (live) |
| `../vault/` | the Obsidian knowledge bases (one folder per project) |

## What's next (Milestone 3)
Give one specialist a real tool with a **draft-then-approve** flow:
- Add an MCP server (or in-process `tool()` via `createSdkMcpServer`) to that agent's `AgentDefinition.mcpServers`.
- Gate outbound/irreversible actions behind a Slack approval button before they execute.
- Good first candidates: **Tom + GitHub** (read issues/PRs, draft comments) or **Email + Gmail** (triage/draft).
