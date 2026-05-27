export function parseRestTimeSeconds(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (!value) return 0;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return 0;

  const minuteMatch = normalized.match(/^(\d+)\s*m(?:in)?(?:ute)?s?$/);
  if (minuteMatch) return Number(minuteMatch[1]) * 60;

  const secondMatch = normalized.match(/^(\d+)\s*s(?:ec)?(?:ond)?s?$/);
  if (secondMatch) return Number(secondMatch[1]);

  const numericValue = Number.parseInt(normalized, 10);
  return Number.isNaN(numericValue) ? 0 : numericValue;
}

export function formatRestTimeLabel(value: string | number | null | undefined): string {
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (/^\d+\s*s(?:ec)?(?:ond)?s?$/.test(normalized)) {
      return `${parseRestTimeSeconds(value)}s`;
    }
  }

  return `${parseRestTimeSeconds(value)}s`;
}
