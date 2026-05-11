import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { fetchPokemon, fetchPokemonList, fetchPokemonTerm } from './api';
import type { Pokemon } from '../types/types';
import { server } from '../test-utils/server';


describe('fetchPokemonList', () => {
  it('return list of pokemons of correct length', async () => {
    const result: Pokemon[] = await fetchPokemonList(5);

    expect(result).toHaveLength(5);

    result.forEach((item) => {
      expect(item).toEqual({
        name: expect.any(String),
        url: expect.any(String),
      });
    });
  });

  it('throw error on server failure', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchPokemonList()).rejects.toThrow('Request failed');
  });
});

describe('fetchPokemon', () => {
  it('return pokemon object', async () => {
    const result = await fetchPokemon('pikachu');

    expect(result).toEqual({
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    });
  });

  it('format uppercase input to lowercase', async () => {
    const result = await fetchPokemon('PikACHU');

    expect(result.name).toBe('pikachu');
  });

  it('throw error when pokemon not found', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/:name', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    await expect(fetchPokemon('invalid')).rejects.toThrow('Request failed');
  });
});

describe('fetchPokemonTerm', () => {
  it('return selected pokemon first', async () => {
    const result = await fetchPokemonTerm('pokemon-1', 3);

    expect(result[0].name).toBe('pokemon-1');
  });

  it('get exact limit of results', async () => {
    const result = await fetchPokemonTerm('pokemon-1', 2);

    expect(result.length).toBe(2);
  });

  it('exclude selected pokemon from list', async () => {
    const result = await fetchPokemonTerm('pokemon-1', 5);

    const others = result.slice(1);

    expect(others.every((p) => p.name !== 'pokemon-1')).toBe(true);
  });

  it('handle minimal limit correctly', async () => {
    const result = await fetchPokemonTerm('pokemon-1', 1);

    expect(result[0].name).toBe('pokemon-1');

    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
