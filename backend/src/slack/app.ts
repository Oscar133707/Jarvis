import { App } from "@slack/bolt";
import { env } from "../lib/env.js";

// Socket Mode: connects out over a WebSocket, so no public URL / ngrok needed locally.
export const app = new App({
  token: env.slackBotToken,
  appToken: env.slackAppToken,
  socketMode: true,
  ...(env.slackSigningSecret ? { signingSecret: env.slackSigningSecret } : {}),
});
