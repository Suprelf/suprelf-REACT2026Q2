import type {
  Pokemon,
  PokemonListResponse,
  PokemonApiResponse,
} from '../types/types';

const API_URL = 'https://pokeapi.co/api/v2';

const request = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};


export const fetchPokemonList = async (
  limit = 10,
  offset = 0
): Promise<Pokemon[]> => {
  const data = await request<PokemonListResponse>(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  return Promise.all(
    data.results.map(async (p) => {
      const details = await request<any>(p.url);

      return {
        name: details.name,
        url: p.url,
        image: details.sprites.front_default,
      };
    })
  );
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const data = await request<PokemonApiResponse>(
    `${API_URL}/pokemon/${name.toLowerCase()}`
  );

  return {
    name: data.name,
    url: `${API_URL}/pokemon/${data.name}`,
    image: data.sprites.front_default,
  };
};

export const fetchPokemonDetails = async (name: string) => {
  const [pokemon, species] = await Promise.all([
    request<any>(`${API_URL}/pokemon/${name.toLowerCase()}`),
    request<any>(`${API_URL}/pokemon-species/${name.toLowerCase()}`),
  ]);

  const english = species.flavor_text_entries.filter(
    (e: any) => e.language.name === 'en'
  );

  const flavor =
    english.length > 0
      ? english[english.length - 1].flavor_text
      : '';

  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    flavorText: flavor.replace(/\n|\f/g, ' '),
  };
};