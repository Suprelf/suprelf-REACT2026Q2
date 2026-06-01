import { useMinLoadingQuery } from './useMinLoading';
import { pokemonKeys } from '../services/queryKeys';
import { fetchPokemonDetails } from '../services/api';

export const usePokemonDetails = (name: string) => {
  return useMinLoadingQuery({
    queryKey: pokemonKeys.details(name),
    queryFn: () => fetchPokemonDetails(name),
    enabled: Boolean(name),
  });
};