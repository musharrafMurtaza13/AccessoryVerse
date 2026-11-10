/** Change this if you want a different currency label (e.g. '₹'). */
export const CURRENCY = 'Rs ';

/** d/m/yyyy */
export function formatDate(input: Date | string = new Date()): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

/** Go sends dates like "10-11-2026 11:42:09 AM" (dd-mm-yyyy). */
export function parseApiDate(value?: string): string {
  const m = value?.match(/^(\d{1,2})-(\d{1,2})-(\d{4})/);
  if (m) return `${Number(m[1])}/${Number(m[2])}/${m[3]}`;
  return value ? formatDate(value) : '';
}

/** Go sends prices like "25,000" (a string with commas). */
export function parsePrice(value: string | number): number {
  return typeof value === 'number' ? value : Number(String(value).replace(/,/g, '')) || 0;
}

export function formatPrice(value: number): string {
  return `${CURRENCY}${value.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}