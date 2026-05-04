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

  const data: T = await res.json();
  return data;
};

export const fetchPokemonList = async (limit = 10): Promise<Pokemon[]> => {
  const data = await request<PokemonListResponse>(
    `${API_URL}/pokemon?limit=${limit}&offset=0`
  );

  return data.results;
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  const data = await request<PokemonApiResponse>(
    `${API_URL}/pokemon/${name.toLowerCase()}`
  );

  return {
    name: data.name,
    url: `${API_URL}/pokemon/${data.name}`,
  };
};

export const fetchPokemonTerm = async (
  name: string,
  limit: number = 9
): Promise<Pokemon[]> => {
  const [selected, list] = await Promise.all([
    fetchPokemon(name),
    fetchPokemonList(limit),
  ]);

  const others = list.filter((p) => p.name !== selected.name).slice(0, limit);

  return [selected, ...others];
};
