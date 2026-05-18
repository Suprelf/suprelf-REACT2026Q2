export interface Pokemon {
  name: string;
  url: string;
  image: string;
}

export type PokemonListResponse = {
  results: Pokemon[];
};

export type PokemonApiResponse = {
  name: string;  
  sprites: {
    front_default: string;
  };
};

export type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  flavorText: string;
};