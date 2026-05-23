"use client";

type Props = {
  onShowDisclaimer: () => void;
};

export function Footer({ onShowDisclaimer }: Props) {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-border/60 bg-background/70 px-5 py-3 text-[11px] text-muted-foreground backdrop-blur md:flex-row md:px-8">
      <p className="leading-relaxed">
        本サイトは教育目的のシミュレーションです。実在のサービスとは関係ありません。
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onShowDisclaimer}
          className="font-medium underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          免責事項
        </button>
        <a
          href="https://github.com/Kogia-sima/ipi_demo_web"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 font-medium underline-offset-4 transition-colors hover:text-foreground"
          aria-label="GitHub リポジトリ"
        >
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
}
