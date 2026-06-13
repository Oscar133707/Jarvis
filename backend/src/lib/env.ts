import "dotenv/config";
import path from "node:path";

/** Read a required env var or exit with a clear, actionable message. */
function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    console.error(
      `\n✗ Missing env var: ${name}\n` +
        `  Add it to backend/.env — see backend/SETUP.md for where to get it.\n`,
    );
    process.exit(1);
  }
  return value.trim();
}

export const env = {
  anthropicApiKey: required("ANTHROPIC_API_KEY"),
  slackBotToken: required("SLACK_BOT_TOKEN"),
  slackAppToken: required("SLACK_APP_TOKEN"),
  // Optional in Socket Mode:
  slackSigningSecret: process.env.SLACK_SIGNING_SECRET?.trim() || undefined,
  // Orchestrator model alias: sonnet | opus | haiku
  jarvisModel: process.env.JARVIS_MODEL?.trim() || "sonnet",
  // Root of the Obsidian knowledge bases (one folder per project). Defaults to
  // ../vault relative to the backend (i.e. the repo's vault/).
  vaultDir: path.resolve(process.cwd(), process.env.VAULT_DIR?.trim() || "../vault"),
};
