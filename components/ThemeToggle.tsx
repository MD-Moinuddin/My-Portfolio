'use client';

import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full border border-ink/30 px-3 py-1 text-xs transition-colors dark:border-snow/30"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
