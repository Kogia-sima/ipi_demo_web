"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/utils/utils";

type Props = {
  className?: string;
};

export function ChatInputBar({ className }: Props) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm",
        className,
      )}
      aria-hidden="true"
    >
      <span className="flex-1 truncate text-sm text-muted-foreground">
        下のサンプルプロンプトから選択してください
      </span>
      <span className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <ArrowUp className="size-4" />
      </span>
    </div>
  );
}
