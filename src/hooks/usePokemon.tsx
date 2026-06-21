import { useMinLoadingQuery } from './useMinLoading';
import { pokemonKeys } from '@/services/queryKeys';
import { fetchPokemonList } from '@/services/api';

export const usePokemonList = (limit: number, offset: number) => {
  return useMinLoadingQuery({
    queryKey: pokemonKeys.list(limit, offset),
    queryFn: () => fetchPokemonList(limit, offset),
  });
};
