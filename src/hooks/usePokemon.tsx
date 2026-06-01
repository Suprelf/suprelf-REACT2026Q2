import { useQuery } from '@tanstack/react-query';
import { pokemonKeys } from '../services/queryKeys';
import { fetchPokemonList } from '../services/api';

export const usePokemonList = (
  limit: number,
  offset: number
) => {
  return useQuery({
    queryKey: pokemonKeys.list(limit, offset),
    queryFn: () => fetchPokemonList(limit, offset),
  });
};