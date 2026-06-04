// Slack access helpers.
//
// Full Slack cannot be embedded in an iframe (Slack sends X-Frame-Options: deny),
// so the dashboard talks to Slack two ways:
//   1. Deep links — open a channel directly in the Slack desktop/web app.
//   2. (Future) the Web API — read recent messages + post from the composer.
//      Wire that up in a Next.js route handler (app/api/slack/*) using a bot token;
//      never expose the token to the client.

// Your Slack workspace/team ID (T...). Set NEXT_PUBLIC_SLACK_TEAM_ID in .env.local.
const TEAM_ID = process.env.NEXT_PUBLIC_SLACK_TEAM_ID ?? "";

/** Web link that opens a channel in the Slack web/desktop app. */
export function channelWebUrl(channelId: string): string {
  if (!TEAM_ID) return `https://app.slack.com/client`;
  return `https://app.slack.com/client/${TEAM_ID}/${channelId}`;
}

/** Native deep link (slack://) — opens the desktop app if installed. */
export function channelDeepLink(channelId: string): string {
  if (!TEAM_ID) return `https://app.slack.com/client`;
  return `slack://channel?team=${TEAM_ID}&id=${channelId}`;
}

/**
 * Placeholder for the future "send from dashboard" action.
 * Today it no-ops; later, POST to /api/slack/send which calls chat.postMessage.
 */
export async function sendToChannel(
  channelId: string,
  text: string,
): Promise<{ ok: boolean }> {
  // TODO: replace with `await fetch("/api/slack/send", { method: "POST", body: ... })`
  console.info(`[slack:mock] → ${channelId}: ${text}`);
  return { ok: true };
}
