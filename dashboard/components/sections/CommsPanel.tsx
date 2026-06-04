"use client";

import { useState } from "react";
import { ExternalLink, Hash, Send, Bot } from "lucide-react";
import { GlassPanel } from "@/components/hud/GlassPanel";
import { channels } from "@/lib/mock-data";
import { channelWebUrl, sendToChannel } from "@/lib/slack";

export function CommsPanel() {
  const [selectedId, setSelectedId] = useState(channels[0].id);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);

  const selected = channels.find((c) => c.id === selectedId) ?? channels[0];

  const send = async () => {
    if (!draft.trim()) return;
    await sendToChannel(selected.id, draft.trim());
    setDraft("");
    setSent(true);
    setTimeout(() => setSent(false), 1800);
  };

  return (
    <GlassPanel
      label="Talk to your agents"
      title="Comms · Slack"
      delay={0.2}
      action={
        <a
          href={channelWebUrl(selected.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-[rgba(124,196,255,0.35)] px-2.5 py-1 text-[11px] font-medium text-baby transition-colors hover:bg-[rgba(124,196,255,0.12)]"
        >
          Open in Slack <ExternalLink size={12} />
        </a>
      }
    >
      <div className="grid flex-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
        {/* Channel list */}
        <ul className="flex flex-col gap-1.5">
          {channels.map((c) => {
            const isSel = c.id === selectedId;
            return (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedId(c.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg p-2.5 text-left transition-colors ${
                    isSel
                      ? "glass-active"
                      : "hover:bg-[rgba(124,196,255,0.06)]"
                  }`}
                >
                  <Hash
                    size={16}
                    className={isSel ? "text-baby" : "text-faint"}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-semibold text-ink">
                        {c.name}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px] text-muted">
                        <Bot size={10} /> {c.agent}
                      </span>
                    </div>
                    <p className="truncate text-[11px] text-muted">
                      {c.lastMessage.text}
                    </p>
                  </div>
                  {c.unread > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-baby px-1 text-[10px] font-bold text-bg">
                      {c.unread}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Selected channel preview + composer */}
        <div className="flex flex-col rounded-lg bg-[rgba(6,9,15,0.45)] p-3">
          <div className="hud-label mb-2 flex items-center gap-1.5">
            <Hash size={12} /> {selected.name}
          </div>

          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex gap-2">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[rgba(124,196,255,0.15)]">
                <Bot size={13} className="text-baby" />
              </span>
              <div className="rounded-lg rounded-tl-none bg-[rgba(124,196,255,0.07)] px-3 py-2">
                <div className="mb-0.5 flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-baby">
                    {selected.lastMessage.author}
                  </span>
                  <span className="text-[10px] text-faint">
                    {selected.lastMessage.at}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-ink">
                  {selected.lastMessage.text}
                </p>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="mt-3 flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send();
              }}
              rows={1}
              placeholder={`Message #${selected.name}…`}
              className="max-h-24 flex-1 resize-none rounded-lg border border-[rgba(124,196,255,0.2)] bg-[rgba(6,9,15,0.6)] px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-baby focus:outline-none"
            />
            <button
              onClick={send}
              disabled={!draft.trim()}
              className="grid h-9 w-9 place-items-center rounded-lg bg-baby text-bg transition-opacity hover:opacity-90 disabled:opacity-30"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="mt-1.5 h-3 text-[10px] text-success">
            {sent ? "Sent to Slack ✓ (mock — wire to API later)" : ""}
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}
