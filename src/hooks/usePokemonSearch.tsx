import { useQuery } from '@tanstack/react-query';
import { pokemonKeys } from '../services/queryKeys';
import { fetchPokemon } from '../services/api';

export const usePokemonSearch = (name: string) => {
  return useQuery({
    queryKey: pokemonKeys.search(name),
    queryFn: () => fetchPokemon(name),
    enabled: Boolean(name),
  });
};