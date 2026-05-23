"use client";

import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onAccept: () => void;
};

export function DisclaimerModal({ open, onAccept }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onAccept();
      }}
      disablePointerDismissal
    >
      <DialogContent className="max-w-xl p-0">
        <div className="flex max-h-[85vh] flex-col overflow-hidden">
          <DialogHeader className="relative gap-3 overflow-hidden px-7 pt-7">
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 size-44 rounded-full bg-violet-300/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -top-12 -left-10 size-32 rounded-full bg-sky-300/40 blur-3xl"
            />
            <div className="relative flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30">
              <ShieldAlert className="size-6" aria-hidden="true" />
            </div>
            <div className="relative space-y-1.5">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                ご利用前にお読みください
              </DialogTitle>
              <p className="text-sm leading-relaxed text-muted-foreground">
                本サイトは「間接プロンプトインジェクション」を安全に体験するための教育用シミュレーションです。
              </p>
            </div>
          </DialogHeader>
          <div className="flex-1 space-y-3 overflow-y-auto px-7 py-5">
            <InfoRow
              title="教育目的のシミュレーションです"
              body="実際のAIや外部サービスとは通信していません。表示されるログ・地図・解説はすべて演出であり、攻撃も発生しません。"
            />
            <InfoRow
              title="実在の企業・サービスとは無関係です"
              body="シナリオに登場する「Google Drive」「天気予報サーバ」「会議資料スキル」などはすべて架空の存在で、実在する特定の企業・サービスとは一切関係ありません。"
            />
            <InfoRow
              title="Cookieは同意フラグのみ"
              body="メッセージを閉じる際、同意済みを示すごく小さなフラグをCookieに保存します。それ以外の個人情報は一切取得しません。"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-7 pb-4">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              「理解しました」を押すと、上記内容に同意したものとして体験を開始します。
            </p>
            <Button
              onClick={onAccept}
              size="lg"
              className="shrink-0 rounded-full px-6 shadow-md shadow-indigo-500/20"
            >
              理解しました
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-3.5 shadow-sm shadow-indigo-500/2">
      <p className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </p>
      <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}
