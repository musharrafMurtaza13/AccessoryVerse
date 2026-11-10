/** d/m/yyyy, same as the original design. */
export function formatDate(input: Date | string = new Date()): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
