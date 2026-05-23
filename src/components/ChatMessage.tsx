"use client";

import { Sparkles } from "lucide-react";
import type { Message } from "@/stores/useScenario";
import { cn } from "@/utils/utils";
import { TypingMessage } from "./TypingMessage";

type Props = {
  message: Message;
};

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex w-full items-start gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/30">
          <Sparkles className="size-4" aria-hidden="true" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] text-sm leading-relaxed",
          isUser
            ? "rounded-2xl rounded-tr-md bg-foreground px-4 py-2.5 text-background shadow-sm"
            : "rounded-2xl rounded-tl-md border border-border/70 bg-card px-4 py-3 text-foreground shadow-sm shadow-indigo-500/[0.03]",
        )}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap break-words">
            {message.text}
          </span>
        ) : (
          <TypingMessage text={message.text} isTyping={!!message.isTyping} />
        )}
      </div>
    </div>
  );
}
