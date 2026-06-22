import type { PokemonStore } from "@/types/types";

export const mockPokemonStore: PokemonStore = {
  selectedPokemons: [
    { name: "pikachu", url: "", image: "" },
    { name: "bulbasaur", url: "", image: "" },
  ],

  togglePokemon: () => {},

  isSelected: () => false,

  clearSelected: () => {},
};