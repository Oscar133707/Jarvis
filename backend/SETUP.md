# Jarvis Backend — Setup (do this once)

You need two things: an **Anthropic API key** and a **Slack app**. ~10 minutes. Put every value into
`backend/.env` (copy `.env.example` first). Then `npm run dev`.

---

## 1. Anthropic API key

1. Go to **console.anthropic.com** → **API Keys** → **Create Key**. Name it `jarvis`.
2. Make sure **billing is enabled** (Settings → Billing) — this key is separate from your Claude Code subscription.
3. Copy the key (`sk-ant-…`) into `.env` as `ANTHROPIC_API_KEY`.

---

## 2. Slack app (Socket Mode)

### a) Create the app
- Go to **api.slack.com/apps** → **Create New App** → **From scratch**.
- Name: `Jarvis`. Pick your workspace → **Create App**.

### b) Turn on Socket Mode + app token
- Left sidebar → **Socket Mode** → toggle **Enable Socket Mode** on.
- It prompts to create an **App-Level Token** → name it `socket`, add scope **`connections:write`** → **Generate**.
- Copy the token (`xapp-…`) into `.env` as `SLACK_APP_TOKEN`.

### c) Bot permissions
- Left sidebar → **OAuth & Permissions** → scroll to **Scopes → Bot Token Scopes** → **Add** each of:
  - `app_mentions:read`
  - `chat:write`
  - `channels:history`
  - `channels:read`
  - `groups:history`
  - `im:history`
  - `im:read`
  - `im:write`
  - `reactions:write`

### d) Subscribe to events
- Left sidebar → **Event Subscriptions** → toggle **Enable Events** on.
  (With Socket Mode there is **no Request URL** to fill — good.)
- Expand **Subscribe to bot events** → **Add** each of:
  - `app_mention`
  - `message.im`
  - `message.channels`  ← only if you want Jarvis to read messages in channels it's in
- **Save Changes** (bottom right).

### e) Install + get the bot token
- Left sidebar → **Install App** → **Install to Workspace** → **Allow**.
- Back on **OAuth & Permissions**, copy the **Bot User OAuth Token** (`xoxb-…`) into `.env` as `SLACK_BOT_TOKEN`.

### f) (optional) Signing secret
- **Basic Information** → **App Credentials** → **Signing Secret** → copy into `.env` as `SLACK_SIGNING_SECRET`.
  (Not strictly required in Socket Mode, but harmless to include.)

### g) Create your first project channel
- A **project = a Slack channel + a folder in `../vault/`**. We've seeded project #1: **Josko Tours**
  (`vault/josko-tours/`). So create the matching channel:
  - In Slack, create a channel named **`josko-tours`** → `/invite @Jarvis`.
- You can also just **DM the Jarvis bot** for the general context.
- To add more projects later (live, no restart): create a channel + a `vault/<slug>/_project.md` with
  frontmatter `slackChannel: <channel-name>`. See [`../vault/README.md`](../vault/README.md).

---

## 3. Run it

```bash
cd backend
cp .env.example .env     # then fill in the values above
npm install
npm run dev
```

You should see `⚡ Jarvis online`. In Slack, DM the bot or `@Jarvis hej` and it replies.

> If something fails on boot, the error message tells you which env var is missing or which Slack scope/token
> is wrong. Re-check the matching step above.
