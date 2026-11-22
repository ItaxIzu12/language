export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** Local date as YYYY-MM-DD (sortable, timezone-safe for "days"). */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(key: string, n: number): string {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d + n));
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Removes punctuation and whitespace so spoken/typed answers can be compared. */
export function normalize(text: string): string {
  return text.toLowerCase().replace(/[\s.,!?;:'"“”‘’。，！？；：、…·()（）\-—]/g, "");
}

/** Similarity 0..1 based on Levenshtein distance. */
export function similarity(a: string, b: string): number {
  const s = normalize(a);
  const t = normalize(b);
  if (!s.length && !t.length) return 1;
  if (!s.length || !t.length) return 0;
  const prev = Array.from({ length: t.length + 1 }, (_, i) => i);
  for (let i = 1; i <= s.length; i++) {
    let last = prev[0];
    prev[0] = i;
    for (let j = 1; j <= t.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (s[i - 1] === t[j - 1] ? 0 : 1));
      last = tmp;
    }
  }
  return 1 - prev[t.length] / Math.max(s.length, t.length);
}
