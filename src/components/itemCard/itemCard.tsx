'use client';

import type { Pokemon } from '@/types/types';
import { usePokemonStore } from '@/store/store';

type Props = {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
};

export default function ItemCard({ pokemon, onSelect }: Props) {
  const togglePokemon = usePokemonStore((state) => state.togglePokemon);
  const isMarked = usePokemonStore((state) =>
    state.isSelected(pokemon.name)
  );

  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div
      className="grid-item"
      onClick={() => onSelect(pokemon)}
      style={{ position: 'relative' }}
    >
      <input
        type="checkbox"
        checked={isMarked}
        onChange={() => togglePokemon(pokemon)}
        onClick={(e) => e.stopPropagation()}
        className="card-checkbox"
      />

      <img
        className="img-card"
        src={pokemon.image}
        alt={pokemon.name}
      />

      <div>{formatName(pokemon.name)}</div>
    </div>
  );
}