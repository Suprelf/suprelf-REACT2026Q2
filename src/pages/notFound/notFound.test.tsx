import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './notFound';

const renderNotFound = () =>
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

describe('NotFound page', () => {
  it('renders 404 title', () => {
    renderNotFound();

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders error message', () => {
    renderNotFound();

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('renders navigation link to home', () => {
    renderNotFound();

    const link = screen.getByText('Go Home');

    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
