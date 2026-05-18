import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';

import { fetchPokemon, fetchPokemonList, fetchPokemonDetails } from './api';

import { server } from '../test-utils/server';

describe('fetchPokemonList', () => {
  it('returns correct number of pokemons with full structure', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
        const url = new URL(request.url);
        const limit = Number(url.searchParams.get('limit') || 3);

        return HttpResponse.json({
          results: Array.from({ length: limit }).map((_, i) => ({
            name: `pokemon-${i}`,
            url: `https://pokeapi.co/api/v2/pokemon/pokemon-${i}`,
          })),
        });
      }),

      http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
        return HttpResponse.json({
          name: params.name,
          sprites: {
            front_default: 'img.png',
          },
        });
      })
    );

    const result = await fetchPokemonList(3);

    expect(result).toHaveLength(3);

    result.forEach((p) => {
      expect(p).toEqual({
        name: expect.any(String),
        url: expect.any(String),
        image: expect.any(String),
      });
    });
  });

  it('handles server error', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchPokemonList()).rejects.toThrow('Request failed: 500');
  });
});

describe('fetchPokemon', () => {
  it('returns pokemon with correct structure', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () => {
        return HttpResponse.json({
          name: 'pikachu',
          sprites: { front_default: 'img.png' },
        });
      })
    );

    const result = await fetchPokemon('pikachu');

    expect(result.name).toBe('pikachu');
    expect(result.url).toContain('pikachu');
    expect(result.image).toBeTruthy();
  });

  it('normalizes uppercase input to lowercase', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
        return HttpResponse.json({
          name: String(params.name).toLowerCase(),
          sprites: { front_default: 'img.png' },
        });
      })
    );

    const result = await fetchPokemon('PikACHU');

    expect(result.name).toBe('pikachu');
  });

  it('throws error on 404', async () => {
    server.use(
      http.get(
        'https://pokeapi.co/api/v2/pokemon/:name',
        () => new HttpResponse(null, { status: 404 })
      )
    );

    await expect(fetchPokemon('invalid')).rejects.toThrow(
      'Request failed: 404'
    );
  });
});

describe('fetchPokemonDetails', () => {
  const speciesMock = {
    flavor_text_entries: [
      {
        flavor_text: 'hello\nworld\ftext',
        language: { name: 'en' },
      },
    ],
  };

  it('returns full pokemon details', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () =>
        HttpResponse.json({
          id: 1,
          name: 'pikachu',
          sprites: { front_default: 'img.png' },
        })
      ),

      http.get('https://pokeapi.co/api/v2/pokemon-species/:name', () =>
        HttpResponse.json(speciesMock)
      )
    );

    const result = await fetchPokemonDetails('pikachu');

    expect(result).toEqual({
      id: expect.any(Number),
      name: 'pikachu',
      image: expect.any(String),
      flavorText: expect.any(String),
    });
  });

  it('cleans flavor text', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () =>
        HttpResponse.json({
          id: 1,
          name: 'pikachu',
          sprites: { front_default: 'img.png' },
        })
      ),

      http.get('https://pokeapi.co/api/v2/pokemon-species/:name', () =>
        HttpResponse.json(speciesMock)
      )
    );

    const result = await fetchPokemonDetails('pikachu');

    expect(result.flavorText).not.toMatch(/\n|\f/);
  });

  it('returns empty flavorText if no english entries exist', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () =>
        HttpResponse.json({
          id: 1,
          name: 'pikachu',
          sprites: { front_default: 'img.png' },
        })
      ),

      http.get('https://pokeapi.co/api/v2/pokemon-species/:name', () =>
        HttpResponse.json({
          flavor_text_entries: [],
        })
      )
    );

    const result = await fetchPokemonDetails('pikachu');

    expect(result.flavorText).toBe('');
  });
});
