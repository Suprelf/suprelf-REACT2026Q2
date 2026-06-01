import { describe, it, expect, vi, beforeEach } from 'vitest';

import { usePokemonList } from './usePokemon';
import { useMinLoadingQuery } from './useMinLoading';
import { pokemonKeys } from '../services/queryKeys';

vi.mock('./useMinLoading', () => ({
  useMinLoadingQuery: vi.fn(),
}));

describe('usePokemonList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls useMinLoadingQuery with correct params', () => {
    usePokemonList(10, 20);

    expect(useMinLoadingQuery).toHaveBeenCalledWith({
      queryKey: pokemonKeys.list(10, 20),
      queryFn: expect.any(Function),
    });
  });

  it('returns value from useMinLoadingQuery', () => {
    const mockResult = {
      data: [],
      showLoader: false,
    };

    vi.mocked(useMinLoadingQuery).mockReturnValue(mockResult as any);

    const result = usePokemonList(10, 0);

    expect(result).toBe(mockResult);
  });
});
