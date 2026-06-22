"use client";

import "./itemCard.css";
import type { Pokemon } from "@/types/types";
import { usePokemonStore } from "@/store/store";
import Image from "next/image";

type Props = {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
};

export default function ItemCard({ pokemon, onSelect }: Props) {
  const togglePokemon = usePokemonStore((s) => s.togglePokemon);
  const isMarked = usePokemonStore((s) => s.isSelected(pokemon.name));

  return (
    <div className="grid-item" onClick={() => onSelect(pokemon)}>
      <input
        type="checkbox"
        checked={isMarked}
        onChange={() => togglePokemon(pokemon)}
        onClick={(e) => e.stopPropagation()}
        className="card-checkbox"
      />

      <Image
        className="img-card"
        src={pokemon.image}
        alt={pokemon.name}
        width={144}
        height={144}
      />

      <div>
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </div>
    </div>
  );
}