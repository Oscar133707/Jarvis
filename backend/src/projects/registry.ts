import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { env } from "../lib/env.js";
import type { ProjectContext } from "./types.js";

// Projects are convention-driven: each folder in vault/ with a `_project.md`
// (frontmatter: name, slackChannel) is a project. We re-scan with a short TTL so
// a project added while the bot is running appears live, without a restart.

const TTL_MS = 5000;
let cache: { at: number; byChannel: Map<string, ProjectContext> } | undefined;

async function scan(): Promise<Map<string, ProjectContext>> {
  const byChannel = new Map<string, ProjectContext>();
  let slugs: string[];
  try {
    const dirents = await fs.readdir(env.vaultDir, { withFileTypes: true });
    slugs = dirents.filter((d) => d.isDirectory()).map((d) => d.name);
  } catch {
    return byChannel; // vault dir missing → no projects yet
  }

  for (const slug of slugs) {
    const vaultPath = path.join(env.vaultDir, slug);
    try {
      const raw = await fs.readFile(path.join(vaultPath, "_project.md"), "utf8");
      const fm = matter(raw).data as { name?: string; slackChannel?: string };
      const slackChannel = (fm.slackChannel ?? "").replace(/^#/, "").trim();
      if (!slackChannel) continue; // e.g. _general has no channel → not channel-routable
      byChannel.set(slackChannel, {
        slug,
        name: fm.name?.trim() || slug,
        slackChannel,
        vaultPath,
      });
    } catch {
      // no _project.md → not a registered project; skip
    }
  }
  return byChannel;
}

async function byChannelMap(): Promise<Map<string, ProjectContext>> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.byChannel;
  const byChannel = await scan();
  cache = { at: Date.now(), byChannel };
  return byChannel;
}

/** Find the project bound to a Slack channel name, if any. */
export async function resolveProjectByChannel(
  channelName?: string,
): Promise<ProjectContext | undefined> {
  if (!channelName) return undefined;
  return (await byChannelMap()).get(channelName.replace(/^#/, ""));
}

export async function listProjects(): Promise<ProjectContext[]> {
  return [...(await byChannelMap()).values()];
}

/** The general (DM) knowledge base — vault/_general, if it exists. */
export async function generalContext(): Promise<ProjectContext | undefined> {
  const vaultPath = path.join(env.vaultDir, "_general");
  try {
    await fs.access(path.join(vaultPath, "_project.md"));
    return { slug: "_general", name: "General", slackChannel: "", vaultPath };
  } catch {
    return undefined;
  }
}
