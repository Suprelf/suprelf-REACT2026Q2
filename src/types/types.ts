export interface Pokemon {
  name: string;
  url: string;
  image: string;
}

export type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  flavorText: string;
};

export type PokemonListResponse = {
  results: Pokemon[];
};

export type PokemonApiResponse = {
  name: string;
  sprites: {
    front_default: string;
  };
};

export type PokemonDetailsResponse = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

export type PokemonSpeciesResponse = {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
};

export type PokemonStore = {
  selectedPokemons: Pokemon[];

  togglePokemon: (pokemon: Pokemon) => void;

  isSelected: (name: string) => boolean;

  clearSelected: () => void;
};
