"use client";

import { Terminal } from "lucide-react";
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
        "flex h-full min-h-0 flex-col bg-zinc-950 text-zinc-200 " +
        (className ?? "")
      }
      aria-label="AI内部ログ"
    >
      <div className="border-b border-zinc-800 p-3 md:p-4">
        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400">
          <Terminal className="size-3.5" aria-hidden="true" />
          <span>世界地図 / 通信状況</span>
        </div>
        <WorldMap scenarioId={scenarioId} attackActive={attackActive} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 text-xs uppercase tracking-wider text-zinc-400 md:px-4">
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
            <div className="px-4 py-8 text-center text-xs text-zinc-500">
              プロンプトを送信すると、AIの内部処理がここに表示されます。
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
