// Mock data for the v1 UI. No backend yet — every export here is a stand-in
// for what a Next.js API route (wired to Slack / Gmail / Ads / your DB) will
// return later. Keep the shapes (lib/types.ts) stable so the swap is painless.

import type {
  Alert,
  HabitItem,
  PersonalStat,
  Project,
  SlackChannel,
} from "./types";

export const OWNER_NAME = "Oscar";

export const alerts: Alert[] = [
  {
    id: "a1",
    title: "Refund spike on main store",
    detail: "Sarah flagged 4 refund requests in the last hour citing a checkout bug.",
    source: "Sarah · #customer-reviews",
    severity: "critical",
    raisedAt: "8m ago",
  },
  {
    id: "a2",
    title: "PR ready for your review",
    detail: "Tom opened #482 — fixes the checkout race condition. Needs approval to merge.",
    source: "Tom · #dev",
    severity: "warning",
    raisedAt: "23m ago",
  },
  {
    id: "a3",
    title: "Ad set underperforming",
    detail: "‘Spring–Retarget’ CPA up 38% vs. 7-day avg. Pause or let it run?",
    source: "Ads agent · #ads",
    severity: "warning",
    raisedAt: "1h ago",
  },
  {
    id: "a4",
    title: "Draft reply waiting",
    detail: "Email agent drafted a response to a partnership inquiry. Approve to send.",
    source: "Email agent · #emails",
    severity: "info",
    raisedAt: "2h ago",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "Jarvis OS",
    kind: "main",
    status: "on-track",
    progress: 42,
    nextMilestone: "Dashboard v1 shipped",
    owner: "You + Tom",
  },
  {
    id: "p2",
    name: "Storefront",
    kind: "side",
    status: "at-risk",
    progress: 71,
    nextMilestone: "Checkout bugfix → deploy",
    owner: "Tom",
  },
  {
    id: "p3",
    name: "Content engine",
    kind: "side",
    status: "on-track",
    progress: 30,
    nextMilestone: "Schedule next 7 posts",
    owner: "Content agent",
  },
  {
    id: "p4",
    name: "Ads — Q2 push",
    kind: "side",
    status: "blocked",
    progress: 18,
    nextMilestone: "Creative approval",
    owner: "Ads agent",
  },
];

export const habits: HabitItem[] = [
  { id: "h1", label: "Took creatine", done: true, streak: 12 },
  { id: "h2", label: "Morning workout", done: true, streak: 5 },
  { id: "h3", label: "Deep work block (2h)", done: false, streak: 3 },
  { id: "h4", label: "Read 10 pages", done: false, streak: 8 },
  { id: "h5", label: "No phone after 22:00", done: false, streak: 1 },
];

export const personalStats: PersonalStat[] = [
  { id: "s1", label: "Focus today", value: "1h 40m", hint: "of 3h goal" },
  { id: "s2", label: "Inbox", value: "3", hint: "needs you" },
  { id: "s3", label: "Habits", value: "2/5", hint: "done today" },
  { id: "s4", label: "Streak", value: "12d", hint: "creatine" },
];

export const channels: SlackChannel[] = [
  {
    id: "C0MAIN001",
    name: "main-project",
    purpose: "Primary focus",
    agent: "Jarvis",
    unread: 2,
    lastMessage: {
      id: "m1",
      author: "Jarvis",
      isAgent: true,
      text: "Morning. 3 things need you. Want the rundown?",
      at: "2m ago",
    },
  },
  {
    id: "C0DEV0001",
    name: "dev",
    purpose: "Engineering & PRs",
    agent: "Tom",
    unread: 1,
    lastMessage: {
      id: "m2",
      author: "Tom",
      isAgent: true,
      text: "PR #482 is up for the checkout fix — review when you can.",
      at: "23m ago",
    },
  },
  {
    id: "C0ADS0001",
    name: "ads",
    purpose: "Ad performance",
    agent: "Ads agent",
    unread: 0,
    lastMessage: {
      id: "m3",
      author: "Ads agent",
      isAgent: true,
      text: "Paused the underperforming set pending your call.",
      at: "1h ago",
    },
  },
  {
    id: "C0REV0001",
    name: "customer-reviews",
    purpose: "Reviews & support",
    agent: "Sarah",
    unread: 4,
    lastMessage: {
      id: "m4",
      author: "Sarah",
      isAgent: true,
      text: "Escalated the refund spike to #dev. Drafting holding replies.",
      at: "8m ago",
    },
  },
];
