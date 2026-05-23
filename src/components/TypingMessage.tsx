"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  isTyping: boolean;
  /** ms per character */
  speed?: number;
};

export function TypingMessage({ text, isTyping, speed = 25 }: Props) {
  const [visibleCount, setVisibleCount] = useState(isTyping ? 0 : text.length);

  useEffect(() => {
    if (!isTyping) {
      setVisibleCount(text.length);
      return;
    }
    setVisibleCount(0);
    let cancelled = false;
    let i = 0;
    const interval = window.setInterval(() => {
      if (cancelled) return;
      i += 1;
      setVisibleCount((prev) => Math.min(prev + 1, text.length));
      if (i >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [text, isTyping, speed]);

  const shown = text.slice(0, visibleCount);
  const showCaret = isTyping && visibleCount < text.length;

  return (
    <span className="whitespace-pre-wrap break-words">
      {shown}
      {showCaret && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-foreground/60 align-middle"
        />
      )}
    </span>
  );
}
