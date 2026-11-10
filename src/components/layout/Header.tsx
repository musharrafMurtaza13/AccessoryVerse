import { LogOut, Moon, Sun } from 'lucide-react';
import { Brand } from './Logo';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import type { AuthMode, Page } from '../../types';

export const NAV_ITEMS: Page[] = ['Home', 'Listings', 'About Us', 'Features', 'Newsletter'];

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenAuth: (mode: AuthMode) => void;
}

export function Header({ activePage, onNavigate, onOpenAuth }: HeaderProps) {
  const { isDark, toggle, t } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <header className="px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
      <Brand onClick={() => onNavigate('Home')} />

      <nav className={`hidden md:flex items-center space-x-1 px-4 py-1.5 rounded-full ${t.navPill}`}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => onNavigate(item)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activePage === item ? t.navActive : t.navIdle
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="flex items-center space-x-3">
        {user ? (
          <div className="flex items-center space-x-2">
            <Button arrow onClick={() => onNavigate('Listings')}>
              My Listings
            </Button>
            <Button variant="icon" onClick={signOut} title="Sign Out" aria-label="Sign out">
              <LogOut size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button arrow size="sm" onClick={() => onOpenAuth('signin')}>
              Sign in
            </Button>
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex" onClick={() => onOpenAuth('signup')}>
              Sign up
            </Button>
          </div>
        )}

        <Button variant="icon" onClick={toggle} title="Toggle Light/Dark Theme" aria-label="Toggle theme">
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </Button>
      </div>
    </header>
  );
}