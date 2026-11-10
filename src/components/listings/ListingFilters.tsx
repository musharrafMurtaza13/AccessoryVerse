import { Search } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ListingFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  statuses: readonly string[];
}

export function ListingFilters({ searchTerm, onSearchChange, statusFilter, onStatusChange, statuses }: ListingFiltersProps) {
  const { t } = useTheme();

  return (
    <div className={`mb-4 p-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 ${t.toolbar}`}>
      <div className="relative w-full sm:w-72">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full pl-9 pr-4 py-1.5 text-sm rounded-lg outline-none transition-colors ${t.searchInput}`}
        />
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <span className="text-xs text-gray-400 font-medium">Status:</span>
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              statusFilter === status ? t.tabActive : t.tabIdle
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
