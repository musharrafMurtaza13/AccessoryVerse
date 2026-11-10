import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/** One place for every dark/light class pair, so components stay free of ternaries. */
function buildTokens(dark: boolean) {
  return {
    page: dark ? 'bg-[#0a0a0b] text-gray-100' : 'bg-gray-50 text-gray-900',
    muted: dark ? 'text-gray-400' : 'text-gray-600',
    faint: dark ? 'text-gray-500' : 'text-gray-400',
    body: dark ? 'text-gray-300' : 'text-gray-700',
    strong: dark ? 'text-gray-200' : 'text-gray-900',
    navPill: dark ? 'bg-[#161618] border border-zinc-800/80' : 'bg-white shadow-sm border border-gray-200',
    navActive: dark ? 'bg-zinc-800 text-white shadow-inner' : 'bg-gray-200 text-gray-900',
    navIdle: dark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900',
    tabActive: dark ? 'bg-zinc-800 text-white' : 'bg-gray-200 text-gray-900',
    tabIdle: dark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700',
    iconButton: dark
      ? 'bg-[#18181b] hover:bg-zinc-800 text-gray-300'
      : 'bg-white hover:bg-gray-200 text-gray-700 shadow-sm',
    secondaryButton: dark
      ? 'bg-[#18181b] hover:bg-zinc-800 text-gray-200'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    ghostButton: dark
      ? 'text-gray-400 hover:text-white hover:bg-zinc-800'
      : 'text-gray-600 hover:text-black hover:bg-gray-100',
    panel: dark ? 'bg-[#121214] border-zinc-800/80' : 'bg-white border-gray-200 shadow-sm',
    toolbar: dark ? 'bg-[#121214] border border-zinc-800/60' : 'bg-white shadow-sm border border-gray-200',
    searchInput: dark
      ? 'bg-[#1c1c20] text-white placeholder-gray-500 focus:ring-1 focus:ring-zinc-600'
      : 'bg-gray-100 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-300',
    modal: dark ? 'bg-[#141416] border-zinc-800 text-white' : 'bg-white border-gray-200 text-gray-900',
    modalClose: dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black',
    input: dark
      ? 'bg-[#1b1b1e] border-zinc-700 text-white focus:border-zinc-500'
      : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-gray-500',
    tableHead: dark ? 'border-zinc-800/80 text-gray-400 bg-[#121214]' : 'border-gray-200 text-gray-500 bg-gray-50',
    tableDivide: dark ? 'divide-zinc-800/60' : 'divide-gray-100',
    rowHover: dark ? 'hover:bg-zinc-900/60' : 'hover:bg-gray-50',
    thumb: dark ? 'bg-[#1e1e22] border-zinc-700/50' : 'bg-gray-100 border-gray-200',
    deleteButton: dark
      ? 'hover:bg-red-950/40 text-rose-500/80 hover:text-rose-400'
      : 'hover:bg-red-50 text-red-500',
  };
}

export type ThemeTokens = ReturnType<typeof buildTokens>;

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
  t: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const value = useMemo(
    () => ({ isDark, toggle: () => setIsDark((d) => !d), t: buildTokens(isDark) }),
    [isDark],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}