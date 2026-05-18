import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderAt = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );

describe('App routing', () => {
  it('renders Container on root route', () => {
    renderAt('/');

    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument();
  });

  it('renders About page', () => {
    renderAt('/about');

    expect(screen.getByText('About this app')).toBeInTheDocument();
  });

  it('renders NotFound page for invalid route', () => {
    renderAt('/invalid-route');

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders Container with nested route (details)', () => {
    renderAt('/details/pikachu');

    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument();
  });
});
