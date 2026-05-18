import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import ErrorBoundary from './errorBoundary';
import ErrorButton from '../errorButton/errorButton';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('catches error and shows fallback UI from child component', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', {
      name: /make error/i,
    });

    await user.click(button);

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();

    expect(await screen.findByText('Test error')).toBeInTheDocument();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });
});
