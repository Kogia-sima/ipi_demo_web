"use client";

import { Activity, Globe2, Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import type { LogEntry } from "@/stores/useScenario";
import { LogEntryView } from "./LogEntryView";
import { WorldMap } from "./WorldMap";

type Props = {
  logs: LogEntry[];
  scenarioId: 1 | 2 | 3 | null;
  attackActive: boolean;
  className?: string;
};

export function LogPanel({ logs, scenarioId, attackActive, className }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: rerun scroll-to-bottom whenever logs list changes
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);

  return (
    <section
      className={
        "relative flex h-full min-h-0 flex-col overflow-hidden bg-[oklch(0.18_0.02_260)] text-zinc-200 " +
        (className ?? "")
      }
      aria-label="AI内部ログ"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,oklch(0.4_0.18_265_/_0.25),transparent_55%),radial-gradient(circle_at_100%_100%,oklch(0.45_0.2_300_/_0.18),transparent_55%)]"
      />
      <div className="relative z-10 border-b border-white/5 p-4 md:p-5">
        <SectionHeader
          icon={<Globe2 className="size-3.5" aria-hidden="true" />}
        >
          世界地図 / 通信状況
          {attackActive && <AttackIndicator />}
        </SectionHeader>
        <WorldMap scenarioId={scenarioId} attackActive={attackActive} />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] text-zinc-400 md:px-5">
          <div className="flex items-center gap-2">
            <Terminal className="size-3.5" aria-hidden="true" />
            <span>AI内部ログ</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500">
            ipi-demo://internal-log
          </span>
        </div>
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto py-2">
          {logs.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-10 text-center text-xs text-zinc-500">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/5 text-zinc-400">
                <Activity className="size-4" aria-hidden="true" />
              </div>
              <p className="leading-relaxed">
                プロンプトを送信すると、AIの内部処理が
                <br />
                ここにリアルタイムで表示されます。
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {logs.map((entry) => (
                <LogEntryView key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-400">
      <div className="flex items-center gap-2">
        {icon}
        <span>{children}</span>
      </div>
    </div>
  );
}

function AttackIndicator() {
  return (
    <span className="ml-3 inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-red-300">
      <span
        className="size-1.5 rounded-full bg-red-400"
        style={{ animation: "ipi-blink 1s ease-in-out infinite" }}
      />
      EXFILTRATION
    </span>
  );
}
