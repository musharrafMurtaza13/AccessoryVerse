import { Button } from '../components/ui/Button';
import { PandaPeeking, PandaWaving } from '../components/home/Mascots';
import { SocialProof } from '../components/home/SocialProof';
import { useTheme } from '../context/ThemeContext';

const SPONSORS = [
  'bg-blue-500 rounded-full',
  'bg-red-500 rounded-md',
  'bg-indigo-500 rounded-tr-xl',
  'bg-amber-500 rounded-full',
];

export function HomePage({ onViewListings }: { onViewListings: () => void }) {
  const { t } = useTheme();

  return (
    <section className="relative overflow-hidden pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
          <div className="w-64 h-80"><PandaWaving /></div>
        </div>

        <div className="lg:col-span-6 text-center z-10 space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Buy & Sell with <br />
            <span className="font-serif italic font-normal tracking-normal border-b-2 border-dashed border-gray-600 pb-1">
              confidence
            </span>
          </h1>

          <p className={`max-w-xl mx-auto text-sm sm:text-base leading-relaxed ${t.muted}`}>
            Discover great deals on digital gadgets, phones, laptops, and more. Resell items you no longer need or find pre-loved treasures from local sellers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button arrow size="lg" onClick={onViewListings} className="hover:scale-105 shadow-lg">
              View all listings
            </Button>
            <SocialProof />
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
          <div className="w-64 h-80"><PandaPeeking /></div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-zinc-800/60 max-w-4xl mx-auto flex items-center justify-center text-xs tracking-wider text-gray-500 uppercase">
        <span>Browse phones, laptops, gadgets, accessories & deals</span>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
        {SPONSORS.map((shape) => (
          <div key={shape} className="flex items-center space-x-2 text-sm font-semibold">
            <div className={`w-5 h-5 ${shape}`} />
            <span>logoipsum</span>
          </div>
        ))}
      </div>
    </section>
  );
}
