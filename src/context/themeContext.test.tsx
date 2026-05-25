import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContext } from 'react';

import { ThemeContext, ThemeProvider } from './themeContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeContext', () => {
  it('should have initial theme as light', () => {
    const { result } = renderHook(() => useContext(ThemeContext), { wrapper });

    expect(result.current?.theme).toBe('light');
  });

  it('should toggle theme', () => {
    const { result } = renderHook(() => useContext(ThemeContext), { wrapper });

    act(() => {
      result.current?.toggleTheme();
    });

    expect(result.current?.theme).toBe('dark');

    act(() => {
      result.current?.toggleTheme();
    });

    expect(result.current?.theme).toBe('light');
  });

  it('should set theme manually', () => {
    const { result } = renderHook(() => useContext(ThemeContext), { wrapper });

    act(() => {
      result.current?.setTheme('dark');
    });

    expect(result.current?.theme).toBe('dark');
  });

  it('should update document html theme attribute', () => {
    const { result } = renderHook(() => useContext(ThemeContext), { wrapper });

    act(() => {
      result.current?.setTheme('dark');
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
