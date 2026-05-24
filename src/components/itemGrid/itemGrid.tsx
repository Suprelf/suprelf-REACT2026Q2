import './itemGrid.css';

import type { Pokemon } from '../../types/types';
import ItemCard from '../itemCard/itemCard';

type Props = {
  listData: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
};

const ItemGrid = ({ listData, onSelect }: Props) => {
  
  return (
    <div className="grid-container">
      {listData.map((pokemon) => (
        <ItemCard key={pokemon.name} pokemon={pokemon} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ItemGrid;
