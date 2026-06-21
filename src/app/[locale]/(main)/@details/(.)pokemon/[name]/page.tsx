import Image from "next/image";
import "./details.css";

import { fetchPokemonDetails } from "@/services/api";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default async function DetailsPage({ params }: Props) {
  const { name } = await params;

  const pokemon = await fetchPokemonDetails(name);

  return (
    <aside className="details-panel">
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={150}
        height={150}
        unoptimized
      />

      <h2>{pokemon.name}</h2>

      <p>{pokemon.flavorText}</p>
    </aside>
  );
}
