export function money(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
