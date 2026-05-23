"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";

export function ThinkingMessage() {
  return (
    <div className="flex w-full items-start justify-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30">
        <Sparkles className="size-4" aria-hidden="true" />
      </div>
      <div className="flex max-w-[85%] items-center gap-2.5 rounded-2xl rounded-tl-md border border-border/70 bg-card px-4 py-3 text-foreground shadow-sm">
        <Image
          src="/loading.png"
          alt=""
          width={18}
          height={18}
          className="size-[18px] shrink-0 animate-spin"
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-muted-foreground">
          AIが応答を考えています
          <span
            className="ml-0.5 inline-block"
            style={{ animation: "ipi-blink 1.2s ease-in-out infinite" }}
          >
            ...
          </span>
        </span>
      </div>
    </div>
  );
}
