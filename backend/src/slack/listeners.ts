import type { App } from "@slack/bolt";
import type { WebClient } from "@slack/web-api";
import { runJarvis } from "../orchestrator/jarvis.js";
import { generalContext, resolveProjectByChannel } from "../projects/registry.js";
import { buildHistoryNote, stripMention } from "./format.js";

let cachedBotUserId: string | undefined;
async function getBotUserId(client: WebClient): Promise<string | undefined> {
  if (cachedBotUserId) return cachedBotUserId;
  try {
    const res = await client.auth.test();
    cachedBotUserId = res.user_id as string;
  } catch (err) {
    console.error("auth.test failed:", err);
  }
  return cachedBotUserId;
}

interface HandleArgs {
  client: WebClient;
  rawText: string;
  channel: string;
  threadTs: string;
  eventTs: string;
  isDm: boolean;
}

async function handle({ client, rawText, channel, threadTs, eventTs, isDm }: HandleArgs) {
  const botUserId = await getBotUserId(client);
  const text = stripMention(rawText, botUserId);
  if (!text) return;

  // Resolve channel name (for project lookup) — DMs have no name.
  let channelName: string | undefined;
  if (!isDm) {
    try {
      const info = await client.conversations.info({ channel });
      channelName = info.channel?.name;
    } catch {
      /* ignore */
    }
  }

  // Map this conversation to a project (channel → project) or the general DM context.
  const project = isDm
    ? await generalContext()
    : await resolveProjectByChannel(channelName);

  // A non-DM channel that isn't wired to a project yet: guide, don't guess.
  if (!isDm && !project) {
    await client.chat.postMessage({
      channel,
      thread_ts: threadTs,
      text:
        `👋 Den här kanalen (*#${channelName ?? channel}*) är inte kopplad till något Jarvis-projekt än.\n` +
        `Skapa en mapp \`vault/${channelName ?? "<slug>"}/\` med en \`_project.md\` ` +
        `(frontmatter \`slackChannel: ${channelName ?? "<kanalnamn>"}\`) så börjar jag jobba här.`,
    });
    return;
  }

  // Acknowledge receipt visually (best-effort).
  try {
    await client.reactions.add({ channel, timestamp: eventTs, name: "eyes" });
  } catch {
    /* non-critical */
  }

  // Recent thread for conversational context.
  let historyNote: string | undefined;
  try {
    const replies = await client.conversations.replies({ channel, ts: threadTs, limit: 12 });
    historyNote = buildHistoryNote(replies.messages ?? [], botUserId);
  } catch {
    /* no thread history */
  }

  const where = isDm ? "DM" : `#${channelName ?? channel}`;
  console.log(`→ Jarvis (${where}${project ? ` · ${project.name}` : ""}): ${text}`);

  const reply = await runJarvis({ text, contextNote: historyNote, project });
  await client.chat.postMessage({ channel, thread_ts: threadTs, text: reply });
}

interface GenericMessage {
  subtype?: string;
  bot_id?: string;
  text?: string;
  channel: string;
  channel_type?: string;
  ts: string;
  thread_ts?: string;
}

export function registerListeners(app: App) {
  // @mention in any channel the bot is in.
  app.event("app_mention", async ({ event, client }) => {
    if ("bot_id" in event && event.bot_id) return;
    await handle({
      client: client as unknown as WebClient,
      rawText: event.text ?? "",
      channel: event.channel,
      threadTs: event.thread_ts ?? event.ts,
      eventTs: event.ts,
      isDm: false,
    });
  });

  // Direct messages to the bot. (Channel messages are handled via app_mention,
  // so here we only act on DMs to avoid double-replying.)
  app.message(async ({ message, client }) => {
    const m = message as GenericMessage;
    if (m.subtype || m.bot_id) return;
    if (m.channel_type !== "im") return;
    await handle({
      client: client as unknown as WebClient,
      rawText: m.text ?? "",
      channel: m.channel,
      threadTs: m.thread_ts ?? m.ts,
      eventTs: m.ts,
      isDm: true,
    });
  });
}
