'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccentKey = 'sand' | 'cobalt' | 'ember' | 'platinum';

export const ACCENTS: Record<AccentKey, {
  label: string;
  hex: string;
  rgb: string;
  description: string;
}> = {
  sand: {
    label: 'Sand Gold',
    hex: '#C9A87A',
    rgb: '201, 168, 122',
    description: 'Warm, earthy, premium',
  },
  cobalt: {
    label: 'Cobalt Blue',
    hex: '#4895EF',
    rgb: '72, 149, 239',
    description: 'Clean, focused, athletic',
  },
  ember: {
    label: 'Ember',
    hex: '#F07830',
    rgb: '240, 120, 48',
    description: 'Energetic, bold',
  },
  platinum: {
    label: 'Platinum',
    hex: '#A8A8A8',
    rgb: '168, 168, 168',
    description: 'Monochrome, minimal',
  },
};

interface ThemeContextType {
  accent: AccentKey;
  setAccent: (key: AccentKey) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  accent: 'sand',
  setAccent: () => {},
});

function applyAccent(key: AccentKey) {
  const { hex, rgb } = ACCENTS[key];
  const root = document.documentElement;
  root.style.setProperty('--color-accent', hex);
  root.style.setProperty('--color-accent-rgb', rgb);
  root.style.setProperty('--color-accent-dim', `rgba(${rgb}, 0.09)`);
  root.style.setProperty('--color-accent-glow', `rgba(${rgb}, 0.12)`);
  root.style.setProperty('--border-accent', `1px solid rgba(${rgb}, 0.20)`);
}

function getInitialAccent(): AccentKey {
  if (typeof window === 'undefined') return 'sand';

  const saved = localStorage.getItem('repflow-accent') as AccentKey | null;
  return saved && ACCENTS[saved] ? saved : 'sand';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentKey>(getInitialAccent);

  useEffect(() => {
    applyAccent(accent);
  }, [accent]);

  function setAccent(key: AccentKey) {
    setAccentState(key);
    localStorage.setItem('repflow-accent', key);
  }

  return (
    <ThemeContext.Provider value={{ accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
