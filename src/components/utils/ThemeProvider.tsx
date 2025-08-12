'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyHtmlDataTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');

  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    if (theme === 'system') return getSystemTheme();
    return theme;
  }, [theme]);

  useEffect(() => {
    // Inicializar desde localStorage si existe
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') as Theme | null : null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored);
        return;
      }
    } catch {}
    // Si no hay valor almacenado, mantener 'system'
  }, []);

  useEffect(() => {
    // Persistir y aplicar al <html>
    try {
      window.localStorage.setItem('theme', theme);
    } catch {}
    applyHtmlDataTheme(resolvedTheme);
  }, [theme, resolvedTheme]);

  useEffect(() => {
    // Escuchar cambios del sistema si se usa 'system'
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        applyHtmlDataTheme(getSystemTheme());
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const currentResolved = prev === 'system' ? getSystemTheme() : prev;
      const nextResolved = currentResolved === 'dark' ? 'light' : 'dark';
      // Mantener selección explícita (no alternar a 'system')
      return nextResolved;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ theme, resolvedTheme, setTheme, toggleTheme }), [theme, resolvedTheme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


