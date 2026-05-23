import type { LogVariant, ScenarioEvent } from "@/data/scenarios";

export type RunnerHandlers = {
  onUserMessage: (text: string) => void;
  onAiMessage: (text: string) => void;
  onLog: (
    action: string,
    detail: string,
    variant: LogVariant,
    relativeMs: number,
  ) => void;
  onAttackChange: (active: boolean) => void;
  onComplete: () => void;
};

export function runScenario(
  events: ScenarioEvent[],
  handlers: RunnerHandlers,
): () => void {
  const timers: ReturnType<typeof setTimeout>[] = [];
  for (const ev of events) {
    const timer = setTimeout(() => {
      switch (ev.kind) {
        case "user-msg":
          handlers.onUserMessage(ev.text);
          break;
        case "ai-msg":
          handlers.onAiMessage(ev.text);
          break;
        case "log":
          handlers.onLog(ev.action, ev.detail, ev.variant ?? "info", ev.at);
          break;
        case "attack-on":
          handlers.onAttackChange(true);
          break;
        case "attack-off":
          handlers.onAttackChange(false);
          break;
        case "complete":
          handlers.onComplete();
          break;
      }
    }, ev.at);
    timers.push(timer);
  }
  return () => {
    for (const timer of timers) clearTimeout(timer);
  };
}
