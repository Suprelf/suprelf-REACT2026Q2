import { describe, it, expect, vi, beforeEach } from 'vitest';

import { usePokemonDetails } from './usePokemonDetails';
import { useMinLoadingQuery } from './useMinLoading';
import { pokemonKeys } from '../services/queryKeys';

vi.mock('./useMinLoading', () => ({
  useMinLoadingQuery: vi.fn(),
}));

describe('usePokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls useMinLoadingQuery with enabled=true when name exists', () => {
    usePokemonDetails('pikachu');

    expect(useMinLoadingQuery).toHaveBeenCalledWith({
      queryKey: pokemonKeys.details('pikachu'),
      queryFn: expect.any(Function),
      enabled: true,
    });
  });

  it('calls useMinLoadingQuery with enabled=false when name is empty', () => {
    usePokemonDetails('');

    expect(useMinLoadingQuery).toHaveBeenCalledWith({
      queryKey: pokemonKeys.details(''),
      queryFn: expect.any(Function),
      enabled: false,
    });
  });

  it('returns value from useMinLoadingQuery', () => {
    const mockResult = {
      data: undefined,
      showLoader: false,
    };

    vi.mocked(useMinLoadingQuery).mockReturnValue(mockResult as any);

    const result = usePokemonDetails('pikachu');

    expect(result).toBe(mockResult);
  });
});
