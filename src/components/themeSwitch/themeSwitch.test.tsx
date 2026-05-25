import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ThemeSwitch from './themeSwitch';
import { useTheme } from '../../hooks/useTheme';

vi.mock('../../hooks/useTheme');

describe('ThemeSwitch', () => {
  it('should render light theme icon', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitch />);

    expect(screen.getByRole('button')).toHaveTextContent('☽');
  });

  it('should render dark theme icon', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      toggleTheme: vi.fn(),
    });

    render(<ThemeSwitch />);

    expect(screen.getByRole('button')).toHaveTextContent('☼');
  });

  it('should call toggleTheme on click', async () => {
    const toggleThemeMock = vi.fn();

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      toggleTheme: toggleThemeMock,
    });

    const user = userEvent.setup();

    render(<ThemeSwitch />);

    await user.click(screen.getByRole('button'));

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});
