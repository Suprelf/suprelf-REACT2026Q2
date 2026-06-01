export const pokemonKeys = {
  all: ['pokemon'] as const,

  list: (limit: number, offset: number) =>
    [...pokemonKeys.all, 'list', limit, offset] as const,

  details: (name: string) => [...pokemonKeys.all, 'details', name] as const,

  search: (name: string) => [...pokemonKeys.all, 'search', name] as const,
};
