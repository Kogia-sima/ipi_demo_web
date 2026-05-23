"use client";

import { Square } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Scenario } from "@/data/scenarios";
import type { Message, Status } from "@/stores/useScenario";
import { ChatInputBar } from "./ChatInputBar";
import { ChatMessage } from "./ChatMessage";
import { SamplePromptList } from "./SamplePromptList";

type Props = {
  status: Status;
  messages: Message[];
  onSelect: (scenario: Scenario) => void;
  onAbort: () => void;
  className?: string;
};

export function ChatPanel({
  status,
  messages,
  onSelect,
  onAbort,
  className,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: rerun scroll-to-bottom whenever messages list changes
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const running = status === "running";
  const hasMessages = messages.length > 0;

  return (
    <section
      className={
        "flex h-full min-h-0 flex-col border-border bg-background md:border-r " +
        (className ?? "")
      }
      aria-label="チャット"
    >
      {hasMessages ? (
        <ActiveLayout
          messages={messages}
          running={running}
          scrollRef={scrollRef}
          onSelect={onSelect}
          onAbort={onAbort}
        />
      ) : (
        <CenteredLayout onSelect={onSelect} />
      )}
    </section>
  );
}

function CenteredLayout({
  onSelect,
}: {
  onSelect: (scenario: Scenario) => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-8 md:px-6">
      <div className="max-w-md space-y-2 text-center">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          AIに話しかけてみましょう
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          下のサンプルプロンプトから1つを選ぶと、AIが応答する様子と、その裏側で起きている
          「間接プロンプトインジェクション」を疑似的に体験できます。
        </p>
      </div>
      <ChatInputBar className="max-w-md" />
      <SamplePromptList onSelect={onSelect} className="max-w-md" />
    </div>
  );
}

function ActiveLayout({
  messages,
  running,
  scrollRef,
  onSelect,
  onAbort,
}: {
  messages: Message[];
  running: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (scenario: Scenario) => void;
  onAbort: () => void;
}) {
  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
        </div>
      </div>
      <div className="border-t border-border bg-background/95 p-3 md:p-4">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
          {running ? (
            <div className="flex items-center gap-2">
              <ChatInputBar className="flex-1" />
              <Button
                type="button"
                variant="destructive"
                size="lg"
                onClick={onAbort}
                className="shrink-0"
              >
                <Square className="size-3 fill-current" aria-hidden="true" />
                中断
              </Button>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                別のシナリオを試すには、下からプロンプトを選択してください。
              </p>
              <SamplePromptList onSelect={onSelect} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
