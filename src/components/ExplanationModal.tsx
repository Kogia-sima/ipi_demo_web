"use client";

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
      <DialogContent className="max-w-2xl">
        {scenario && (
          <>
            <DialogHeader>
              <span className="text-xs font-medium text-primary">
                解説 — {scenario.badge}
              </span>
              <DialogTitle>{scenario.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
                <Image
                  src={scenario.illustration}
                  alt={`${scenario.badge}の攻撃イメージ`}
                  width={800}
                  height={450}
                  className="h-auto w-full"
                />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold">攻撃の仕組み</h3>
                <p className="text-sm leading-relaxed text-foreground">
                  {scenario.description}
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold">対策方法</h3>
                <ul className="list-inside list-disc space-y-1 text-sm leading-relaxed text-foreground">
                  {scenario.countermeasures.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={onClose} size="lg">
                閉じる
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
