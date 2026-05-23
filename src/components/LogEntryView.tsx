"use client";

import { TriangleAlert } from "lucide-react";
import type { LogEntry } from "@/stores/useScenario";
import { cn } from "@/utils/utils";

type Props = {
  entry: LogEntry;
};

export function LogEntryView({ entry }: Props) {
  const isAttack = entry.variant === "attack";
  const isSystem = entry.variant === "system";
  return (
    <div
      className={cn(
        "flex items-start gap-2 px-3 py-1.5 font-mono text-[12px] leading-relaxed",
        isAttack && "border-l-2 border-red-500 bg-red-950/40 text-red-300",
        isSystem && "text-amber-200",
        !isAttack && !isSystem && "text-zinc-200",
      )}
    >
      <span className="shrink-0 text-zinc-500">[{entry.t}]</span>
      {isAttack && (
        <TriangleAlert
          className="mt-0.5 size-3.5 shrink-0 text-red-400"
          aria-hidden="true"
        />
      )}
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "font-semibold",
            isAttack
              ? "text-red-300"
              : isSystem
                ? "text-amber-200"
                : "text-zinc-100",
          )}
        >
          {entry.action}
        </span>
        <span className="ml-2 text-zinc-400">{entry.detail}</span>
      </div>
    </div>
  );
}
