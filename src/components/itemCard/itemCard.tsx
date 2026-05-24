import './itemCard.css';
import { useState } from 'react';

import type { Pokemon } from '../../types/types';

type Props = {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
};

const ItemCard = ({ pokemon, onSelect }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  const toggleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div
      className="grid-item"
      onClick={() => onSelect(pokemon)}
      style={{ position: 'relative' }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          toggleSelect();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="card-checkbox"
      />

      <img className="img-card" src={pokemon.image} alt={pokemon.name} />

      <div>{formatName(pokemon.name)}</div>
    </div>
  );
};

export default ItemCard;
