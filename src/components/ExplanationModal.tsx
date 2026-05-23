"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Scenario } from "@/data/scenarios";

type Props = {
  open: boolean;
  scenario: Scenario | null;
  onClose: () => void;
};

export function ExplanationModal({ open, scenario, onClose }: Props) {
  return (
    <Dialog
      open={open && scenario !== null}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="max-w-2xl p-0">
        {scenario && (
          <div className="flex max-h-[85vh] flex-col overflow-hidden">
            <DialogHeader className="border-b border-border/60 bg-linear-to-br from-indigo-50 via-white to-violet-50 px-6 py-5">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {scenario.title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/40">
                <Image
                  src={scenario.illustration}
                  alt={`${scenario.badge}の攻撃イメージ`}
                  width={800}
                  height={450}
                  className="h-auto w-full"
                />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-tight text-foreground">
                  攻撃の仕組み
                </h3>
                <p className="text-sm leading-relaxed text-foreground/85">
                  {scenario.description}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-tight text-foreground">
                  対策方法
                </h3>
                <ul className="space-y-2">
                  {scenario.countermeasures.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2 text-sm leading-relaxed text-foreground/85"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter className="border-t border-border/60 bg-muted/30 px-6 py-4">
              <Button onClick={onClose} size="lg" className="rounded-full px-6">
                閉じる
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
