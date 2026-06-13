// Small helpers to turn Slack events into orchestrator input and back.

/** Remove a leading/any bot @mention (e.g. "<@U123> hej" → "hej"). */
export function stripMention(text: string, botUserId?: string): string {
  let out = text;
  if (botUserId) out = out.replaceAll(`<@${botUserId}>`, " ");
  // Strip any other leftover user mentions of the bot form just in case.
  return out.replace(/\s+/g, " ").trim();
}

interface ThreadMsg {
  user?: string;
  text?: string;
  bot_id?: string;
}

/**
 * Turn recent thread messages into a compact context note for Jarvis.
 * Keeps the last few turns so replies stay coherent without bloating the prompt.
 */
export function buildHistoryNote(
  messages: ThreadMsg[],
  botUserId: string | undefined,
  limit = 8,
): string | undefined {
  const recent = messages
    .filter((m) => m.text && m.text.trim())
    .slice(-limit - 1, -1); // exclude the current (last) message
  if (recent.length === 0) return undefined;
  const lines = recent.map((m) => {
    const who = m.bot_id || m.user === botUserId ? "Jarvis" : "Oscar";
    return `${who}: ${m.text}`;
  });
  return `Recent thread (for context):\n${lines.join("\n")}`;
}
