import { http, HttpResponse } from 'msw';

const createPokemon = (name: string) => ({
  name,
  url: `https://pokeapi.co/api/v2/pokemon/${name}`,
});

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
    const url = new URL(request.url);

    const limit = Number(url.searchParams.get('limit') || 10);

    return HttpResponse.json({
      results: Array.from({ length: limit }).map((_, i) =>
        createPokemon(`pokemon-${i}`)
      ),
    });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const name = params.name as string;

    return HttpResponse.json({
      name,
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
      sprites: {
        front_default: `https://img.poke/${name}.png`,
      },
    });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon-species/:name', () => {
    return HttpResponse.json({
      flavor_text_entries: [
        {
          flavor_text: 'test\nflavor\ftext',
          language: { name: 'en' },
        },
      ],
    });
  }),
];
