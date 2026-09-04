import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'arabicfix-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved as Theme;
    }
    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    let themeToApply = theme;
    if (theme === 'system') {
      themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.classList.add(themeToApply);
    // Also set a data attribute for CSS var fallback
    root.setAttribute('data-theme', themeToApply);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  };

  return { theme, toggleTheme };
}