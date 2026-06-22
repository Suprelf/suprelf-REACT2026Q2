import { NextResponse } from "next/server";
import { fetchPokemonDetails } from "@/services/api";

export async function POST(req: Request) {
  const { names } = await req.json();

  if (!names?.length) {
    return NextResponse.json(
      { error: "No selected pokemons" },
      { status: 400 },
    );
  }

  const detailed = await Promise.all(
    names.map(async (name: string) => {
      const details = await fetchPokemonDetails(name);

      return {
        id: details.id,
        name,
        description: details.flavorText,
        image: details.image,
      };
    }),
  );

  const headers = ["id", "name", "description", "image"];

  const rows = detailed.map((p) => [
    String(p.id),
    p.name,
    p.description,
    p.image,
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
    ),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${names.length}_pokemon.csv"`,
    },
  });
}
