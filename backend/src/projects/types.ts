export interface ProjectContext {
  /** Slug = the vault folder name, e.g. "josko-tours". */
  slug: string;
  /** Human name from frontmatter, e.g. "Josko Tours". */
  name: string;
  /** Slack channel name (without #) this project is bound to. */
  slackChannel: string;
  /** Absolute path to the project's vault folder. */
  vaultPath: string;
}
