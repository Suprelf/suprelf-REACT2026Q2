import { fetchPokemonDetails } from "@/services/api";

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await fetchPokemonDetails(params.name);

  return (
    <div>
      <h1>{pokemon.name}</h1>

      <pre>{JSON.stringify(pokemon, null, 2)}</pre>
    </div>
  );
}
