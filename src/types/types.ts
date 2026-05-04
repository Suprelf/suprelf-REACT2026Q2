export interface Pokemon {
  name: string;
  url: string;
}

export type PokemonListResponse = {
  results: Pokemon[];
};

export type PokemonApiResponse = {
  name: string;
};
