import path from "node:path";
import type { CanUseTool } from "@anthropic-ai/claude-agent-sdk";

// Tools that are always safe for a project agent (read-only / no side effects).
// (Most are also in `allowedTools`, so this callback mainly governs writes.)
const SAFE = new Set(["Read", "Grep", "Glob", "Agent", "TodoWrite", "NotebookRead"]);
const WRITE = new Set(["Write", "Edit", "MultiEdit"]);

/**
 * Permission callback that grounds an agent in a project's vault:
 * - read tools: allowed
 * - Write/Edit: allowed ONLY inside <vaultPath>/notes/ (the growing per-project database)
 * - everything else (Bash, WebFetch, …): denied
 */
export function makeCanUseTool(vaultPath: string): CanUseTool {
  const notesDir = path.join(vaultPath, "notes");

  return async (toolName, input) => {
    if (SAFE.has(toolName)) {
      return { behavior: "allow", updatedInput: input };
    }

    if (WRITE.has(toolName)) {
      const filePath = typeof input.file_path === "string" ? input.file_path : "";
      const abs = path.resolve(vaultPath, filePath);
      const inNotes = abs === notesDir || abs.startsWith(notesDir + path.sep);
      if (inNotes) {
        return { behavior: "allow", updatedInput: input };
      }
      return {
        behavior: "deny",
        message:
          `You may only write inside this project's notes/ folder. ` +
          `Save it under notes/ (e.g. notes/decisions.md) instead of "${filePath}".`,
      };
    }

    return {
      behavior: "deny",
      message: `Tool "${toolName}" isn't available to Jarvis project agents.`,
    };
  };
}
