import Image from "next/image";
import "./details.css";
import { fetchPokemonDetails } from "@/services/api";
import CloseButton from "./closeButton";

type Props = {
  params: Promise<{
    locale: string;
    name: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function DetailsPage({ params }: Props) {
  const { name } = await params;

  const pokemon = await fetchPokemonDetails(name);

  return (
    <aside className="details-panel">
      <CloseButton />

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