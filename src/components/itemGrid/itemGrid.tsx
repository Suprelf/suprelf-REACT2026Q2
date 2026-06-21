'use client';

import './itemGrid.css';

import type { Pokemon } from '@/types/types';
import ItemCard from '../itemCard/itemCard';

import { useRouter } from 'next/navigation';

type Props = {
  listData: Pokemon[];
};

export default function ItemGrid({ listData }: Props) {
  const router = useRouter();

  const handleSelect = (pokemon: Pokemon) => {
    console.log(pokemon.name)
    router.push(`/en/pokemon/${pokemon.name}`);
  };

  return (
    <div className="grid-container">
      {listData.map((pokemon) => (
        <ItemCard
          key={pokemon.name}
          pokemon={pokemon}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}