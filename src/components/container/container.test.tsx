import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';

import Container from './container';
import { server } from '../../test-utils/server';




describe('Container component', () => {
  it('loads pokemon list on mount', async () => {
    render(<Container />);

    expect(await screen.findByText('Pokemon-0')).toBeInTheDocument();
    expect(await screen.findByText('Pokemon-1')).toBeInTheDocument();
  });

  it('add pokemon using search', async () => {
    const user = userEvent.setup();

    render(<Container />);

    const input = screen.getByPlaceholderText('Search here');
    const button = screen.getByText('Search');

    await user.type(input, 'pokemon-0');
    await user.click(button);

    expect(await screen.findByTestId('loader')).toBeInTheDocument();

    const rows = await screen.findAllByTestId('pokemon-row');

    expect(rows[0]).toHaveTextContent('pokemon-0');
  });

it('do not duplicate existing pokemon on search', async () => {
    const user = userEvent.setup();

    render(<Container />);

    const input = screen.getByPlaceholderText('Search here');
    const button = screen.getByText('Search');

    await user.type(input, 'pokemon-0');
    await user.click(button);

    await screen.findByText('Pokemon-0');

    const all = screen.getAllByText('Pokemon-0');

    expect(all).toHaveLength(1);
});

  it('show error when pokemon not found', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    render(<Container />);

    await user.type(screen.getByPlaceholderText('Search here'), 'invalid');

    await user.click(screen.getByText('Search'));

    expect(await screen.findByText('Pokemon not found')).toBeInTheDocument();
  });

  it('show loader during request', async () => {
    const user = userEvent.setup();

    render(<Container />);

    const input = screen.getByPlaceholderText('Search here');
    const button = screen.getByText('Search');

    await user.type(input, 'pikachu');
    await user.click(button);

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('loads list when localStorage is empty', async () => {
    localStorage.setItem('last', '');

    render(<Container />);

    expect(await screen.findByText('Pokemon-0')).toBeInTheDocument();
  });

  it('shows error when initial load fails', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon', () => {
        return HttpResponse.error();
      })
    );

    render(<Container />);

    expect(await screen.findByText('Failed to load data')).toBeInTheDocument();
  });
});
