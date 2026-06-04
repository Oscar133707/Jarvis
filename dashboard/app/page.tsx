import { BootSequence } from "@/components/shell/BootSequence";
import { Sidebar } from "@/components/shell/Sidebar";
import { Topbar } from "@/components/shell/Topbar";
import { GlassPanel } from "@/components/hud/GlassPanel";
import { ArcReactorOrb } from "@/components/hud/ArcReactorOrb";
import { AlertsPanel } from "@/components/sections/AlertsPanel";
import { ProjectsPanel } from "@/components/sections/ProjectsPanel";
import { PersonalPanel } from "@/components/sections/PersonalPanel";
import { CommsPanel } from "@/components/sections/CommsPanel";
import { alerts, channels, projects } from "@/lib/mock-data";

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-[rgba(124,196,255,0.05)] px-3 py-2.5 text-center">
      <div className="font-display text-2xl font-bold text-baby">{value}</div>
      <div className="hud-label mt-0.5">{label}</div>
    </div>
  );
}

export default function Home() {
  const agents = new Set(channels.map((c) => c.agent)).size;
  const onTrack = projects.filter((p) => p.status === "on-track").length;
  const unread = channels.reduce((n, c) => n + c.unread, 0);

  return (
    <>
      <BootSequence />
      <Sidebar />

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-28 pt-6 md:pb-10 md:pl-28 md:pr-8">
        {/* Overview / hero */}
        <div id="overview" className="scroll-mt-6">
          <Topbar />
          <GlassPanel hero label="System overview" title="Jarvis is running point">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <ArcReactorOrb size={140} health={96} label="ONLINE" />
              <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
                <StatTile value={String(agents)} label="Agents active" />
                <StatTile value={String(alerts.length)} label="Alerts open" />
                <StatTile value={`${onTrack}/${projects.length}`} label="On track" />
                <StatTile value={String(unread)} label="Slack unread" />
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Bento grid */}
        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <div id="alerts" className="scroll-mt-24 lg:col-span-5">
            <AlertsPanel />
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7">
            <div id="projects" className="scroll-mt-24">
              <ProjectsPanel />
            </div>
            <div id="personal" className="scroll-mt-24">
              <PersonalPanel />
            </div>
          </div>

          <div id="comms" className="scroll-mt-24 lg:col-span-12">
            <CommsPanel />
          </div>
        </div>

        <footer className="mt-8 text-center">
          <p className="hud-label text-faint">
            Jarvis OS · v1 dashboard · mock data — backend coming
          </p>
        </footer>
      </main>
    </>
  );
}
