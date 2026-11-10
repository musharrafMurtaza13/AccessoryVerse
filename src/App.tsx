import { useState } from 'react';
import { Header } from './components/layout/Header';
import { AuthModal } from './components/auth/AuthModal';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { useTheme } from './context/ThemeContext';
import type { AuthMode, Page } from './types';

export default function App() {
  const { t } = useTheme();
  const [page, setPage] = useState<Page>('Home');
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased ${t.page}`}>
      <Header activePage={page} onNavigate={setPage} onOpenAuth={setAuthMode} />

      {page === 'Home' && <HomePage onViewListings={() => setPage('Listings')} />}
      {page === 'Listings' && <ListingsPage onRequireAuth={() => setAuthMode('signin')} />}
      {(page === 'About Us' || page === 'Features' || page === 'Newsletter') && <PlaceholderPage title={page} />}

      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onSwitchMode={setAuthMode} />
    </div>
  );
}
