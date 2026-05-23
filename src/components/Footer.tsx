"use client";

type Props = {
  onShowDisclaimer: () => void;
};

export function Footer({ onShowDisclaimer }: Props) {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground md:flex-row md:px-6">
      <p>
        本サイトは教育目的のシミュレーションです。実在のAIやサービスとは関係ありません。
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onShowDisclaimer}
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          免責事項
        </button>
        <span aria-hidden="true">·</span>
        <a
          href="https://github.com/Kogia-sima/ipi_demo_web"
          target="_blank"
          rel="noreferrer noopener"
          className="underline-offset-4 hover:text-foreground hover:underline"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
