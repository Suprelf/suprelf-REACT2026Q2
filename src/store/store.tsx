import { create } from 'zustand';
import type { PokemonStore } from '../types/types';

export const usePokemonStore = create<PokemonStore>((set, get) => ({
  selectedPokemons: [],

  togglePokemon: (pokemon) => {
    const selected = get().selectedPokemons;

    const exists = selected.some((p) => p.name === pokemon.name);

    if (exists) {
      set({
        selectedPokemons: selected.filter((p) => p.name !== pokemon.name),
      });
    } else {
      set({
        selectedPokemons: [...selected, pokemon],
      });
    }
  },

  isSelected: (name) => {
    return get().selectedPokemons.some((p) => p.name === name);
  },

  clearSelected: () => {
    set({ selectedPokemons: [] });
  },
}));
