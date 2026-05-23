"use client";

import { BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Scenario } from "@/data/scenarios";
import type { Message, Status } from "@/stores/useScenario";
import { ChatInputBar } from "./ChatInputBar";
import { ChatMessage } from "./ChatMessage";
import { SamplePromptList } from "./SamplePromptList";
import { ThinkingMessage } from "./ThinkingMessage";

type Props = {
  status: Status;
  messages: Message[];
  aiThinking: boolean;
  onSelect: (scenario: Scenario) => void;
  onAbort: () => void;
  onShowExplanation: () => void;
  className?: string;
};

export function ChatPanel({
  status,
  messages,
  aiThinking,
  onSelect,
  onAbort,
  onShowExplanation,
  className,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: rerun scroll-to-bottom whenever messages list or thinking state changes
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, aiThinking]);

  const running = status === "running";
  const hasMessages = messages.length > 0;

  return (
    <section
      className={
        "flex h-full min-h-0 flex-col border-border/60 md:border-r " +
        (className ?? "")
      }
      aria-label="チャット"
    >
      {hasMessages ? (
        <ActiveLayout
          messages={messages}
          aiThinking={aiThinking}
          running={running}
          completed={status === "completed"}
          scrollRef={scrollRef}
          onSelect={onSelect}
          onAbort={onAbort}
          onShowExplanation={onShowExplanation}
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
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-10 md:px-6">
      <div className="max-w-xl space-y-3 text-center">
        <h2 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
          <span className="bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            こんにちは
          </span>
        </h2>
        <p className="font-heading text-xl font-medium tracking-tight text-foreground/90 md:text-2xl">
          AIに話しかけてみましょう
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          下のサンプルプロンプトから1つを選ぶと、AIが応答する様子と、その裏側で起きている
          「間接プロンプトインジェクション」を疑似的に体験できます。
        </p>
      </div>
      <ChatInputBar className="max-w-xl" />
      <SamplePromptList onSelect={onSelect} className="max-w-xl" />
    </div>
  );
}

function ActiveLayout({
  messages,
  aiThinking,
  running,
  completed,
  scrollRef,
  onSelect,
  onAbort,
  onShowExplanation,
}: {
  messages: Message[];
  aiThinking: boolean;
  running: boolean;
  completed: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (scenario: Scenario) => void;
  onAbort: () => void;
  onShowExplanation: () => void;
}) {
  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          {aiThinking && <ThinkingMessage />}
          {completed && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300 pl-12">
              <Button
                size="lg"
                onClick={onShowExplanation}
                className="rounded-full bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500 px-5 text-white shadow-md shadow-indigo-500/30 hover:brightness-110"
              >
                <BookOpen aria-hidden="true" />
                解説を表示
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border/60 bg-background/70 p-4 backdrop-blur md:p-5">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
          {running ? (
            <ChatInputBar placeholder="AIが応答を生成中..." onAbort={onAbort} />
          ) : (
            <>
              <p className="text-xs font-medium text-muted-foreground">
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
