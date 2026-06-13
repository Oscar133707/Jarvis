import type { AgentDefinition } from "@anthropic-ai/claude-agent-sdk";
import { SPECIALIST_PERSONAS, VAULT_AGENT_NOTE } from "./personas.js";

// Build the subagent map Jarvis can delegate to. Specialists can READ the project
// vault (Read/Grep/Glob) so they work from real project facts, but they cannot
// write or run commands — only Jarvis writes to the project's notes/ folder, and
// the orchestrator's canUseTool callback enforces that boundary.
export const SPECIALISTS: Record<string, AgentDefinition> = Object.fromEntries(
  Object.entries(SPECIALIST_PERSONAS).map(([name, persona]) => [
    name,
    {
      description: persona.description,
      prompt: persona.prompt + VAULT_AGENT_NOTE,
      tools: ["Read", "Grep", "Glob"], // read the vault; no writes/commands
      model: "inherit",
    } satisfies AgentDefinition,
  ]),
);

export const SPECIALIST_NAMES = Object.keys(SPECIALISTS);
