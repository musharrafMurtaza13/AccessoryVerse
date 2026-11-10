import { Star } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AVATARS = [
  'photo-1534528741775-53994a69daeb',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1500648767791-00dcc994a43e',
  'photo-1494790108377-be9c29b29330',
];

export function SocialProof() {
  const { t } = useTheme();
  return (
    <div className="flex items-center space-x-3">
      <div className="flex -space-x-2 overflow-hidden">
        {AVATARS.map((id) => (
          <img
            key={id}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-900"
            src={`https://images.unsplash.com/${id}?w=100&auto=format&fit=crop&q=80`}
            alt="User"
          />
        ))}
      </div>
      <div className="text-left text-xs">
        <div className="flex text-amber-400 space-x-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
        </div>
        <span className={`font-medium ${t.muted}`}>Trusted by 1000+ buyers and sellers</span>
      </div>
    </div>
  );
}