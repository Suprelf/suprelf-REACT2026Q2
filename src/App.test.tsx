import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderAt = (route: string) => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

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
