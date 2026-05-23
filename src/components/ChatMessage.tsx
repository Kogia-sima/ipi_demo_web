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
        "flex w-full items-start gap-2",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-sm">
          <Sparkles className="size-4" aria-hidden="true" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-card-foreground",
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
