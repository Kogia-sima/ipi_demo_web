import { ShieldAlert } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/60 bg-background/80 px-5 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-3">
        <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
          <ShieldAlert className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
            間接プロンプトインジェクション体験デモ
          </span>
          <span className="hidden text-[11px] font-medium tracking-wide text-muted-foreground md:inline">
            Indirect Prompt Injection · Educational Simulation
          </span>
        </div>
      </div>
    </header>
  );
}
