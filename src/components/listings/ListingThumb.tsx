import { Laptop, Mouse, Package } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { Listing } from '../../types';

export function ListingThumb({ listing }: { listing: Listing }) {
  const { t } = useTheme();
  const title = listing.title.toLowerCase();

  return (
    <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border ${t.thumb}`}>
      {listing.imageUrl ? (
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
      ) : title.includes('macbook') || title.includes('laptop') ? (
        <div className="w-full h-full bg-[#1f1f23] rounded-xl flex items-center justify-center">
          <Laptop className="w-6 h-6 text-zinc-500" />
        </div>
      ) : title.includes('mouse') ? (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <Mouse className="w-7 h-7 text-gray-800" />
        </div>
      ) : (
        <div className="w-full h-full bg-[#1f1f23] flex items-center justify-center">
          <Package className="w-6 h-6 text-zinc-500" />
        </div>
      )}
    </div>
  );
}