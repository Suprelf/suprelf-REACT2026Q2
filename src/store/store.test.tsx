import { describe, it, expect, beforeEach } from 'vitest';

import { usePokemonStore } from './store';
import { mockData } from '../test-utils/tableCorrectDataMock';

describe('store', () => {
  const [pikachu, bulbasaur] = mockData;

  beforeEach(() => {
    usePokemonStore.setState({
      selectedPokemons: [],
    });
  });

  it('should have empty initial state', () => {
    const state = usePokemonStore.getState();

    expect(state.selectedPokemons).toEqual([]);
  });

  it('should add pokemon when not selected', () => {
    usePokemonStore.getState().togglePokemon(pikachu);

    const state = usePokemonStore.getState();

    expect(state.selectedPokemons).toHaveLength(1);
    expect(state.selectedPokemons[0]).toEqual(pikachu);
  });

  it('should remove pokemon when already selected', () => {
    usePokemonStore.setState({
      selectedPokemons: [pikachu],
    });

    usePokemonStore.getState().togglePokemon(pikachu);

    const state = usePokemonStore.getState();

    expect(state.selectedPokemons).toEqual([]);
  });

  it('should return true if pokemon is selected', () => {
    usePokemonStore.setState({
      selectedPokemons: [pikachu],
    });

    const result = usePokemonStore.getState().isSelected('pikachu');

    expect(result).toBe(true);
  });

  it('should return false if pokemon is not selected', () => {
    const result = usePokemonStore.getState().isSelected('none');

    expect(result).toBe(false);
  });

  it('should clear selected pokemons', () => {
    usePokemonStore.setState({
      selectedPokemons: [pikachu, bulbasaur],
    });

    usePokemonStore.getState().clearSelected();

    const state = usePokemonStore.getState();

    expect(state.selectedPokemons).toEqual([]);
  });
});
