import { useMinLoadingQuery } from './useMinLoading';
import { pokemonKeys } from '../services/queryKeys';
import { fetchPokemon } from '../services/api';

export const usePokemonSearch = (name: string) => {
  return useMinLoadingQuery({
    queryKey: pokemonKeys.search(name),
    queryFn: () => fetchPokemon(name),
    enabled: Boolean(name),
  });
};