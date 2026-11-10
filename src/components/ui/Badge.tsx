import type { ListingStatus } from '../../types';

const styles: Record<ListingStatus, string> = {
  Processing: 'bg-[#362312] text-[#d97706] border-[#523315]',
  Active: 'bg-[#0f2e22] text-[#10b981] border-[#164735]',
};

export function StatusBadge({ status }: { status: ListingStatus }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}
