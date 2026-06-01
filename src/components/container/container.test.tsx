import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Container from './container';
import { server } from '../../test-utils/server';

vi.mock('../../hooks/useLoader', () => ({
  useLoader: () => ({
    loading: false,
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

const renderApp = (initialRoute = '/') => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/*" element={<Container />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const setupDefaultApi = () => {
  server.use(
    http.get('https://pokeapi.co/api/v2/pokemon', () => {
      return HttpResponse.json({
        results: Array.from({ length: 10 }).map((_, i) => ({
          name: `pokemon-${i}`,
          url: `https://pokeapi.co/api/v2/pokemon/pokemon-${i}`,
        })),
      });
    }),

    http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
      const name = params.name as string;

      return HttpResponse.json({
        name,
        url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        sprites: {
          front_default: `${name}.png`,
        },
      });
    }),

    http.get('https://pokeapi.co/api/v2/pokemon-species/:name', () => {
      return HttpResponse.json({
        flavor_text_entries: [
          {
            flavor_text: 'test text',
            language: { name: 'en' },
          },
        ],
      });
    })
  );
};

describe('Container', () => {
  beforeEach(() => {
    localStorage.clear();
    setupDefaultApi();
  });

  it('renders pokemon list', async () => {
    renderApp();

    expect(await screen.findByText('Pokemon-0')).toBeInTheDocument();
    expect(await screen.findByText('Pokemon-1')).toBeInTheDocument();
  });

  it('adds searched pokemon to list', async () => {
    const user = userEvent.setup();

    renderApp();

    await user.type(screen.getByPlaceholderText('Search here'), 'pikachu');
    await user.click(screen.getByText('Search'));

    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
  });

  it('does not duplicate pokemon in list after search', async () => {
    const user = userEvent.setup();

    renderApp();

    await user.type(screen.getByPlaceholderText('Search here'), 'Pokemon-0');
    await user.click(screen.getByText('Search'));

    const all = await screen.findAllByText('Pokemon-0');

    expect(all).toHaveLength(1);
  });

  it('shows error on invalid pokemon search', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () =>
        HttpResponse.json(
          { message: 'Pokemon not found' },
          { status: 404 }
        )
      )
    );

    renderApp();

    await user.type(screen.getByPlaceholderText('Search here'), 'invalid');
    await user.click(screen.getByText('Search'));

    expect(
      await screen.findByText(/not found|error/i)
    ).toBeInTheDocument();
  });

  it('shows pagination controls', async () => {
    renderApp();

    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(screen.getByText('◀')).toBeInTheDocument();
    expect(screen.getByText('▶')).toBeInTheDocument();
  });
});