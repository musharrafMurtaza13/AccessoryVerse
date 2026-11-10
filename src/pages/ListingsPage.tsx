import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { ListingFilters } from '../components/listings/ListingFilters';
import { ListingsTable } from '../components/listings/ListingsTable';
import { ListingFormModal } from '../components/listings/ListingFormModal';
import { useListings } from '../hooks/useListings';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const STATUS_FILTERS = ['All', 'Active', 'Processing', 'Sold'] as const;

export function ListingsPage({ onRequireAuth }: { onRequireAuth: () => void }) {
  const { t } = useTheme();
  const { user } = useAuth();
  const { listings, loading, error, addListing, removeListing } = useListings();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [formOpen, setFormOpen] = useState(false);
  const [actionError, setActionError] = useState('');

  const handleDelete = async (id: string | number) => {
    setActionError('');
    try {
      await removeListing(id);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Could not delete listing.');
    }
  };

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [listings, searchTerm, statusFilter]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
          <p className={`text-xs mt-1 ${t.muted}`}>Manage your active and processing market posts</p>
        </div>
        <Button onClick={() => (user ? setFormOpen(true) : onRequireAuth())}>
          <Plus size={18} />
          <span>Post</span>
        </Button>
      </div>

      <Alert message={error || actionError} />

      <ListingFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        statuses={STATUS_FILTERS}
      />

      <ListingsTable listings={filtered} loading={loading} onDelete={handleDelete} />

      <ListingFormModal open={formOpen} onClose={() => setFormOpen(false)} onSubmit={addListing} />
    </main>
  );
}