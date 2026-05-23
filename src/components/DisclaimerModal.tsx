"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>はじめにお読みください</DialogTitle>
          <DialogDescription>
            本サイトをご利用いただく前に、以下の内容をご確認ください。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm leading-relaxed text-foreground">
          <p>
            本サイトは、間接プロンプトインジェクションという攻撃手法を体験的に学ぶための
            <strong>教育目的のシミュレーション</strong>
            です。実際のAIや外部サービスは利用しておらず、攻撃も発生しません。
          </p>
          <p>
            画面に登場する「Google
            Drive」「天気予報サーバ」「会議資料スキル」などは
            すべて架空のものであり、
            <strong>実在する企業・サービスとは一切関係ありません。</strong>
          </p>
          <p>
            このモーダルを閉じると、ブラウザにごく小さな同意フラグ（Cookie）を保存し、
            次回以降の表示を省略します。同意フラグ以外の個人情報は一切取得しません。
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onAccept} size="lg">
            理解しました
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
