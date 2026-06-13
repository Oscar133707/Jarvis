import { env } from "./lib/env.js"; // validates required env vars on import (fail fast)
import { app } from "./slack/app.js";
import { registerListeners } from "./slack/listeners.js";
import { SPECIALIST_NAMES } from "./agents/definitions.js";

async function main() {
  registerListeners(app);
  await app.start();

  console.log("\n⚡ Jarvis online — Socket Mode connected.");
  console.log(`   Model:       ${env.jarvisModel}`);
  console.log(`   Specialists: ${SPECIALIST_NAMES.join(", ")}`);
  console.log("   DM the bot, or @mention it in a channel it's been invited to.\n");
}

main().catch((err) => {
  console.error("Failed to start Jarvis:", err);
  process.exit(1);
});
