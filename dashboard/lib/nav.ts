import {
  LayoutDashboard,
  TriangleAlert,
  FolderKanban,
  HeartPulse,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string; // also the section anchor id
  label: string;
  icon: LucideIcon;
}

// Sections are anchors on the single Overview page; the sidebar scroll-spies them.
export const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "alerts", label: "Alerts", icon: TriangleAlert },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "personal", label: "Personal", icon: HeartPulse },
  { id: "comms", label: "Comms", icon: MessagesSquare },
];
