"use client";

import { ChevronRight, TriangleAlert } from "lucide-react";
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
        "flex items-start gap-2 px-4 py-1.5 font-mono text-[12px] leading-relaxed transition-colors md:px-5",
        isAttack && "border-l-2 border-red-500 bg-red-500/10 text-red-200",
        isSystem && "text-amber-200",
        !isAttack && !isSystem && "text-zinc-200",
      )}
    >
      <span className="shrink-0 text-zinc-500 select-none">[{entry.t}]</span>
      {isAttack ? (
        <TriangleAlert
          className="mt-0.5 size-3.5 shrink-0 text-red-400"
          aria-hidden="true"
        />
      ) : (
        <ChevronRight
          className="mt-0.5 size-3 shrink-0 text-zinc-600"
          aria-hidden="true"
        />
      )}
      <div className="min-w-0 flex-1">
        <span
          className={cn(
            "font-semibold",
            isAttack
              ? "text-red-200"
              : isSystem
                ? "text-amber-100"
                : "text-zinc-100",
          )}
        >
          {entry.action}
        </span>
        <span
          className={cn("ml-2", isAttack ? "text-red-300/90" : "text-zinc-400")}
        >
          {entry.detail}
        </span>
      </div>
    </div>
  );
}
