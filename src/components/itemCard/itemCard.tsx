import './itemCard.css';

import type { Pokemon } from '../../types/types';

type Props = {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
};

const ItemCard = ({ pokemon, onSelect }: Props) => {
  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div
      className="grid-item"
      onClick={() => onSelect(pokemon)}
    >
      <img
        className="img-card"
        src={pokemon.image}
        alt={pokemon.name}
      />

      <div>{formatName(pokemon.name)}</div>
    </div>
  );
};

export default ItemCard;