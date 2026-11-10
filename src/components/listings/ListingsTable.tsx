import { Trash2 } from 'lucide-react';
import { ListingThumb } from './ListingThumb';
import { StatusBadge } from '../ui/Badge';
import { useTheme } from '../../context/ThemeContext';
import { formatPrice } from '../../lib/format';
import type { Listing } from '../../types';

interface ListingsTableProps {
  listings: Listing[];
  loading?: boolean;
  onDelete: (id: Listing['id']) => void;
}

export function ListingsTable({ listings, loading, onDelete }: ListingsTableProps) {
  const { t } = useTheme();

  return (
    <div className={`rounded-2xl border overflow-hidden transition-colors ${t.panel}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className={`border-b text-xs font-semibold uppercase tracking-wider ${t.tableHead}`}>
              <th className="py-4 px-6 w-1/4">Listing</th>
              <th className="py-4 px-4">City</th>
              <th className="py-4 px-4">Price</th>
              <th className="py-4 px-6">Description</th>
              <th className="py-4 px-4">Posted</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className={`divide-y ${t.tableDivide}`}>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500">Loading listings… (the free Render server can take up to a minute to wake up)</td>
              </tr>
            ) : listings.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500">No listings found.</td>
              </tr>
            ) : (
              listings.map((listing) => (
                <tr key={listing.id} className={`transition-colors ${t.rowHover}`}>
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-4">
                      <ListingThumb listing={listing} />
                      <div>
                        <div className="font-semibold text-base leading-tight">{listing.title}</div>
                        <div className={`text-xs mt-0.5 ${t.faint}`}>{listing.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-5 px-4 font-medium ${t.body}`}>{listing.city}</td>
                  <td className={`py-5 px-4 font-semibold whitespace-nowrap ${t.strong}`}>{formatPrice(listing.price)}</td>
                  <td className={`py-5 px-6 max-w-xs truncate ${t.muted}`}>{listing.description}</td>
                  <td className={`py-5 px-4 whitespace-nowrap ${t.body}`}>{listing.posted}</td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    <StatusBadge status={listing.status} />
                  </td>
                  <td className="py-5 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => onDelete(listing.id)}
                      className={`p-2 rounded-lg transition-colors group ${t.deleteButton}`}
                      title="Delete listing"
                      aria-label={`Delete ${listing.title}`}
                    >
                      <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}