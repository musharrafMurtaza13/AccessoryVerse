import { Laptop, Mouse } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { Listing } from '../../types';

export function ListingThumb({ listing }: { listing: Listing }) {
  const { t } = useTheme();
  const isLaptop = listing.title.toLowerCase().includes('macbook');

  return (
    <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border ${t.thumb}`}>
      {listing.imageUrl ? (
        <img src={listing.imageUrl} alt={listing.title} className="w-full h-full object-cover" />
      ) : isLaptop ? (
        <div className="w-full h-full bg-[#1f1f23] rounded-xl flex items-center justify-center">
          <Laptop className="w-6 h-6 text-zinc-500" />
        </div>
      ) : (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <Mouse className="w-7 h-7 text-gray-800" />
        </div>
      )}
    </div>
  );
}
