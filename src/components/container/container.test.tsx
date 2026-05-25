import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import Container from './container';
import { server } from '../../test-utils/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../hooks/useLoader', () => ({
  useLoader: () => ({
    loading: false,
    run: async <T,>(request: Promise<T>): Promise<T> => {
      return await request;
    },
  }),
}));

const renderApp = (initialRoute = '/') =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/*" element={<Container />} />
      </Routes>
    </MemoryRouter>
  );

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

  it('shows pokemon list on load', async () => {
    renderApp();

    expect(await screen.findByText('Pokemon-0')).toBeInTheDocument();
    expect(await screen.findByText('Pokemon-1')).toBeInTheDocument();
  });

  it('adds pokemon after search', async () => {
    const user = userEvent.setup();

    renderApp();

    await user.type(screen.getByPlaceholderText('Search here'), 'pikachu');
    await user.click(screen.getByText('Search'));

    expect(await screen.findByText('Pikachu')).toBeInTheDocument();
  });

  it('does not duplicate pokemon', async () => {
    const user = userEvent.setup();

    renderApp();

    await user.type(screen.getByPlaceholderText('Search here'), 'pokemon-0');
    await user.click(screen.getByText('Search'));

    const all = await screen.findAllByText('Pokemon-0');

    expect(all).toHaveLength(1);
  });

  it('shows error on not found', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () =>
        HttpResponse.json(null, { status: 404 })
      )
    );

    renderApp();

    await user.type(screen.getByPlaceholderText('Search here'), 'invalid');
    await user.click(screen.getByText('Search'));

    expect(await screen.findByText('Pokemon not found')).toBeInTheDocument();
  });

  it('shows pagination', async () => {
    renderApp();

    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(screen.getByText('◀')).toBeInTheDocument();
    expect(screen.getByText('▶')).toBeInTheDocument();
  });
});
