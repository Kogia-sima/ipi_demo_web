"use client";

import { MessageSquare, Terminal } from "lucide-react";
import { cn } from "@/utils/utils";

export type MobileTab = "chat" | "log";

type Props = {
  active: MobileTab;
  onChange: (tab: MobileTab) => void;
};

export function MobilePanelTabs({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="表示パネル切り替え"
      className="flex items-stretch gap-1 border-b border-border bg-muted/30 p-1 md:hidden"
    >
      <TabButton
        active={active === "chat"}
        onClick={() => onChange("chat")}
        label="チャット"
        icon={<MessageSquare className="size-4" aria-hidden="true" />}
      />
      <TabButton
        active={active === "log"}
        onClick={() => onChange("log")}
        label="内部ログ"
        icon={<Terminal className="size-4" aria-hidden="true" />}
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
