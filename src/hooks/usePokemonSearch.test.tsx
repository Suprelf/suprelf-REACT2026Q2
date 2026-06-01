import { describe, it, expect, vi, beforeEach } from 'vitest';

import { usePokemonSearch } from './usePokemonSearch';
import { useMinLoadingQuery } from './useMinLoading';
import { pokemonKeys } from '../services/queryKeys';

vi.mock('./useMinLoading', () => ({
  useMinLoadingQuery: vi.fn(),
}));

describe('usePokemonSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls useMinLoadingQuery with enabled=true when name exists', () => {
    usePokemonSearch('pikachu');

    expect(useMinLoadingQuery).toHaveBeenCalledWith({
      queryKey: pokemonKeys.search('pikachu'),
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it('calls useMinLoadingQuery with enabled=false when name is empty', () => {
    usePokemonSearch('');

    expect(useMinLoadingQuery).toHaveBeenCalledWith({
      queryKey: pokemonKeys.search(''),
      queryFn: expect.any(Function),
      enabled: false,
    });
  });

  it('returns value from useMinLoadingQuery', () => {
    const mockResult = {
      data: undefined,
      showLoader: false,
    };

    vi.mocked(useMinLoadingQuery).mockReturnValue(
      mockResult as any
    );

    const result = usePokemonSearch('pikachu');

    expect(result).toBe(mockResult);
  });
});