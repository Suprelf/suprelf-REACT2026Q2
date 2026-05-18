import './itemGrid.css';

import type { Pokemon } from '../../types/types';

type Props = {
  listData: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
};

const ItemGrid = ({ listData, onSelect }: Props) => {
  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="grid-container">
      {listData.map((pokemon) => (
        <div
          key={pokemon.name}
          className="grid-item"
          onClick={() => onSelect(pokemon)}
        >
          <img className="img-card" src={pokemon.image} alt={pokemon.name} />

          <div>{formatName(pokemon.name)}</div>
        </div>
      ))}
    </div>
  );
};

export default ItemGrid;
