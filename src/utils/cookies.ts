export const DISCLAIMER_COOKIE = "ipi_demo_disclaimer_accepted";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const target = `${name}=`;
  const segments = document.cookie ? document.cookie.split("; ") : [];
  for (const segment of segments) {
    if (segment.startsWith(target)) {
      return decodeURIComponent(segment.slice(target.length));
    }
  }
  return null;
}

export function setCookie(
  name: string,
  value: string,
  options: {
    maxAgeSeconds?: number;
    sameSite?: "Lax" | "Strict" | "None";
  } = {},
) {
  if (typeof document === "undefined") return;
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `SameSite=${options.sameSite ?? "Lax"}`,
  ];
  if (options.maxAgeSeconds !== undefined) {
    parts.push(`Max-Age=${options.maxAgeSeconds}`);
  }
  // biome-ignore lint/suspicious/noDocumentCookie: simple disclaimer flag; Cookie Store API is overkill
  document.cookie = parts.join("; ");
}
