import { fetchPokemonDetails } from '@/services/api';
import type { PokemonDetails } from '@/types/types';

import './details.css';

type Props = {
  params: {
    name: string;
  };
};

export default async function Page({ params }: Props) {
  const details: PokemonDetails = await fetchPokemonDetails(params.name);

  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <aside className="details-panel">
      <a className="close-button" href="/">
        🗙
      </a>

      <img
        className="img-details"
        src={details.image}
        alt={details.name}
      />

      <div>{formatName(details.name)}</div>

      <div>{details.flavorText}</div>
    </aside>
  );
}