import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorButton from './errorButton';
import ErrorBoundary from '../errorBoundary/errorBoundary';

describe('ErrorButton', () => {
  it('renders button with correct text', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('button', { name: /make error/i })
    ).toBeInTheDocument();
  });
});
