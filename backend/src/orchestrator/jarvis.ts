import { query } from "@anthropic-ai/claude-agent-sdk";
import { env } from "../lib/env.js";
import { JARVIS_SYSTEM_PROMPT, projectSystemPrompt } from "../agents/personas.js";
import { SPECIALISTS } from "../agents/definitions.js";
import { makeCanUseTool } from "../lib/permissions.js";
import type { ProjectContext } from "../projects/types.js";

export interface JarvisInput {
  /** The user's message, with the bot @mention already stripped. */
  text: string;
  /** Optional context the orchestrator should know (channel, recent thread). */
  contextNote?: string;
  /** The project this conversation belongs to (its vault grounds the agents). */
  project?: ProjectContext;
}

/**
 * Run one turn of the Jarvis orchestrator.
 *
 * With a project: runs in that project's vault folder with read access to the
 * knowledge base and write access scoped to notes/ (via canUseTool). Reasons,
 * reads the vault, delegates to specialists, records decisions into notes/.
 *
 * Without a project (e.g. an unregistered channel): a sandboxed reasoning-only
 * Jarvis — allowedTools is just ["Agent"] and permissionMode "dontAsk".
 */
export async function runJarvis({ text, contextNote, project }: JarvisInput): Promise<string> {
  const prompt = contextNote ? `${contextNote}\n\nOscar: ${text}` : text;

  const base = {
    agents: SPECIALISTS,
    settingSources: [],
    model: env.jarvisModel,
    maxTurns: 16,
    stderr: (d: string) => {
      if (process.env.JARVIS_DEBUG) console.error("[sdk]", d);
    },
  };

  const options = project
    ? {
        ...base,
        systemPrompt: projectSystemPrompt(project.name),
        cwd: project.vaultPath,
        additionalDirectories: [project.vaultPath],
        allowedTools: ["Agent", "Read", "Grep", "Glob"],
        permissionMode: "default" as const,
        canUseTool: makeCanUseTool(project.vaultPath),
      }
    : {
        ...base,
        systemPrompt: JARVIS_SYSTEM_PROMPT,
        cwd: process.cwd(),
        allowedTools: ["Agent"],
        permissionMode: "dontAsk" as const,
      };

  let finalText = "";
  try {
    for await (const message of query({ prompt, options })) {
      if (message.type === "assistant") {
        for (const block of message.message.content) {
          if (block.type === "tool_use" && (block.name === "Agent" || block.name === "Task")) {
            const sub = (block.input as { subagent_type?: string })?.subagent_type;
            console.log(`  ↳ delegating to: ${sub ?? "?"}`);
          }
        }
      }
      if (message.type === "result" && "result" in message && typeof message.result === "string") {
        finalText = message.result;
      }
    }
  } catch (err) {
    console.error("runJarvis error:", err);
    return "⚠️ Jarvis ran into an error and couldn't respond. (Check the server log.)";
  }

  return finalText.trim() || "…(no response)";
}
