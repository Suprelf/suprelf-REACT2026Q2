import { useQuery } from '@tanstack/react-query';
import { pokemonKeys } from '../services/queryKeys';
import { fetchPokemonDetails } from '../services/api';

export const usePokemonDetails = (name: string) => {
  return useQuery({
    queryKey: pokemonKeys.details(name),
    queryFn: () => fetchPokemonDetails(name),
    enabled: Boolean(name),
  });
};