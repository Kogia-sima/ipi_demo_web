"use client";

import { SCENARIO_LIST, type Scenario } from "@/data/scenarios";
import { cn } from "@/utils/utils";

type Props = {
  disabled?: boolean;
  onSelect: (scenario: Scenario) => void;
  className?: string;
};

export function SamplePromptList({ disabled, onSelect, className }: Props) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {SCENARIO_LIST.map((scenario) => (
        <button
          key={scenario.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(scenario)}
          className="group flex flex-col items-start gap-1 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm shadow-sm transition-colors hover:border-primary hover:bg-primary/5 focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-[11px] font-medium text-primary">
            {scenario.badge}
          </span>
          <span className="text-foreground">{scenario.prompt}</span>
        </button>
      ))}
    </div>
  );
}
