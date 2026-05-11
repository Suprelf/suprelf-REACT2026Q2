import { http, HttpResponse } from 'msw';
import type { Pokemon, PokemonListResponse } from '../types/types';

const createPokemon = (name: string): Pokemon => ({
  name,
  url: `https://pokeapi.co/api/v2/pokemon/${name}`,
});

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
    const url = new URL(request.url);

    const limit = Number(url.searchParams.get('limit') || 10);
    const search = url.searchParams.get('name');

    if (search) {
      return HttpResponse.json(createPokemon(search));
    }

    const data: PokemonListResponse = {
      results: Array.from({ length: limit }).map((_, i) =>
        createPokemon(`pokemon-${i}`)
      ),
    };

    return HttpResponse.json(data);
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const name = params.name as string;

    return HttpResponse.json({
      name,
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
    });
  }),
];
