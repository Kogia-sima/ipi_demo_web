"use client";

import { CloudSun, FileText, Globe2, type LucideIcon } from "lucide-react";
import { SCENARIO_LIST, type Scenario } from "@/data/scenarios";
import { cn } from "@/utils/utils";

const SCENARIO_ICONS: Record<1 | 2 | 3, LucideIcon> = {
  1: Globe2,
  2: CloudSun,
  3: FileText,
};

const SCENARIO_ACCENTS: Record<1 | 2 | 3, string> = {
  1: "from-sky-500/15 to-sky-500/0 text-sky-600 ring-sky-500/20",
  2: "from-amber-500/15 to-amber-500/0 text-amber-600 ring-amber-500/20",
  3: "from-violet-500/15 to-violet-500/0 text-violet-600 ring-violet-500/20",
};

type Props = {
  disabled?: boolean;
  onSelect: (scenario: Scenario) => void;
  className?: string;
};

export function SamplePromptList({ disabled, onSelect, className }: Props) {
  return (
    <div className={cn("flex w-full flex-col gap-2 md:gap-2.5", className)}>
      {SCENARIO_LIST.map((scenario) => {
        const Icon = SCENARIO_ICONS[scenario.id];
        const accent = SCENARIO_ACCENTS[scenario.id];
        return (
          <button
            key={scenario.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(scenario)}
            className="group relative flex items-center gap-2.5 rounded-xl border border-border/70 bg-card px-3 py-2 text-left shadow-sm shadow-indigo-500/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 focus-visible:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:-translate-y-0 disabled:hover:shadow-sm md:gap-3 md:rounded-2xl md:px-4 md:py-3.5"
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ring-1 transition-transform group-hover:scale-105 md:size-10 md:rounded-xl",
                accent,
              )}
              aria-hidden="true"
            >
              <Icon className="size-4 md:size-5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:block">
                {scenario.badge}
              </span>
              <span className="truncate text-sm font-medium text-foreground">
                {scenario.prompt}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="text-muted-foreground transition-colors group-hover:text-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <title>送信</title>
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        );
      })}
    </div>
  );
}
