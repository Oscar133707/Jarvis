// Shared domain types for the Jarvis dashboard.
// When the backend lands, these are the shapes the API routes should return.

export type Severity = "critical" | "warning" | "info";

export interface Alert {
  id: string;
  title: string;
  detail: string;
  source: string; // which agent / channel raised it
  severity: Severity;
  raisedAt: string; // human label, e.g. "12m ago"
}

export type ProjectStatus = "on-track" | "at-risk" | "blocked" | "shipped";

export interface Project {
  id: string;
  name: string;
  kind: "main" | "side";
  status: ProjectStatus;
  progress: number; // 0–100
  nextMilestone: string;
  owner: string; // responsible agent
}

export interface HabitItem {
  id: string;
  label: string;
  done: boolean;
  streak: number; // days
}

export interface PersonalStat {
  id: string;
  label: string;
  value: string;
  hint?: string;
}

export interface SlackChannel {
  id: string; // Slack channel ID (C...), used for deep links
  name: string; // without leading '#'
  purpose: string;
  agent: string; // agent living in this channel
  unread: number;
  lastMessage: SlackMessage;
}

export interface SlackMessage {
  id: string;
  author: string;
  isAgent: boolean;
  text: string;
  at: string; // human label
}
