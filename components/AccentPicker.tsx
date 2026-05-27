'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme, ACCENTS, AccentKey } from '@/context/ThemeContext';

export function AccentPicker() {
  const { accent, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Change accent color"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          padding: '6px 12px',
          background: 'var(--bg-2)',
          border: 'var(--border-subtle)',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'border-color 150ms ease-out',
          outline: 'none',
        }}
      >
        <span style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.8px',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
        }}>
          Theme
        </span>
        <span style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          border: '1.5px solid rgba(255,255,255,0.25)',
          display: 'inline-block',
          flexShrink: 0,
          transition: 'background 300ms ease',
        }} />
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          style={{
            color: 'var(--color-text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 150ms ease',
          }}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          width: '216px',
          background: 'var(--bg-2)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '12px',
          padding: '8px',
          zIndex: 300,
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        }}>
          <p style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            padding: '4px 8px 8px',
            margin: 0,
          }}>
            Accent Color
          </p>

          {(Object.keys(ACCENTS) as AccentKey[]).map((key) => {
            const a = ACCENTS[key];
            const isActive = accent === key;
            return (
              <button
                key={key}
                onClick={() => { setAccent(key); setOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '11px',
                  width: '100%',
                  padding: '9px 10px',
                  background: isActive ? `rgba(${a.rgb}, 0.09)` : 'transparent',
                  border: isActive
                    ? `1px solid rgba(${a.rgb}, 0.25)`
                    : '1px solid transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 150ms ease-out',
                  marginBottom: '2px',
                  outline: 'none',
                }}
              >
                <span style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: a.hex,
                  flexShrink: 0,
                  border: isActive
                    ? '2px solid rgba(255,255,255,0.45)'
                    : '2px solid transparent',
                  transition: 'border-color 150ms',
                }} />
                <span style={{ flex: 1 }}>
                  <span style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isActive ? a.hex : 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                    transition: 'color 150ms',
                    lineHeight: 1.3,
                  }}>
                    {a.label}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: '11px',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                    marginTop: '2px',
                    lineHeight: 1.3,
                  }}>
                    {a.description}
                  </span>
                </span>
                {isActive && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2.5 7L5.5 10L11.5 4" stroke={a.hex} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
