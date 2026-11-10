import { useTheme } from '../context/ThemeContext';

export function PlaceholderPage({ title }: { title: string }) {
  const { t } = useTheme();
  return (
    <main className="max-w-6xl mx-auto px-6 pt-16 pb-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className={`text-sm mt-2 ${t.muted}`}>This page is coming soon.</p>
    </main>
  );
}
