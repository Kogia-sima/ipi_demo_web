"use client";

import { Mic, Paperclip, Sparkles, Square } from "lucide-react";
import { cn } from "@/utils/utils";

type Props = {
  className?: string;
  placeholder?: string;
  onAbort?: () => void;
};

export function ChatInputBar({
  className,
  placeholder = "下のサンプルプロンプトから選択してください",
  onAbort,
}: Props) {
  const abortMode = typeof onAbort === "function";
  return (
    <div
      className={cn(
        "group flex w-full items-center gap-3 rounded-full border border-border/80 bg-card/90 px-5 py-3 shadow-sm shadow-indigo-500/5 ring-1 ring-transparent backdrop-blur transition-shadow",
        className,
      )}
      aria-hidden={abortMode ? undefined : "true"}
    >
      <Sparkles className="size-4 shrink-0 text-indigo-500" />
      <span className="flex-1 truncate text-sm text-muted-foreground">
        {placeholder}
      </span>
      <div className="hidden items-center gap-1 text-muted-foreground/60 md:flex">
        <Paperclip className="size-4" />
        <Mic className="size-4" />
      </div>
      {abortMode ? (
        <button
          type="button"
          onClick={onAbort}
          aria-label="処理を中断"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-md shadow-foreground/30 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
        >
          <Square className="size-3 fill-current" aria-hidden="true" />
        </button>
      ) : (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <title>送信</title>
            <path d="M12 4 6 10h4v9h4v-9h4z" />
          </svg>
        </span>
      )}
    </div>
  );
}
