import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt=""
          width={32}
          height={32}
          className="size-8 rounded-md"
          priority
        />
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-base font-semibold">
            間接プロンプトインジェクションを体験できるサイト
          </span>
        </div>
      </div>
    </header>
  );
}
