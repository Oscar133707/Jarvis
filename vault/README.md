# vault/ — Jarvis project knowledge bases

Each subfolder is one **project** and doubles as an **Obsidian vault** (open this `vault/` folder in Obsidian).
Jarvis's agents read these files to work from real facts, and write their findings into each project's `notes/`.

## How a project is defined
A folder is a project if it contains **`_project.md`** with frontmatter:

```yaml
---
name: Josko Tours
slackChannel: josko-tours    # the Slack channel (without #) bound to this project
---
```

## Start a new project (while others keep running)
1. Create a Slack channel, e.g. `#acme`, and `/invite @Jarvis`.
2. Add a folder `vault/acme/` with an `_project.md` (frontmatter `slackChannel: acme`).
3. That's it — the backend re-scans within a few seconds, no restart. Message `#acme` and Jarvis works on it.

## Layout convention (per project)
- `_project.md` — name + Slack channel + overview
- `brief.md`, `brand.md`, `customer.md`, `decisions.md`, `tasks.md` — core docs (you maintain these)
- `notes/` — **agent-writable**; this is the growing per-project memory/database

`_general/` is the context used for DMs to Jarvis (no channel binding).
