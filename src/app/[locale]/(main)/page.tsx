import ItemGrid from "@/components/itemGrid/itemGrid";
import Paginator from "@/components/paginator/paginator";
import { fetchPokemonList, fetchPokemon } from "@/services/api";
import "./container.css"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const search = params.search?.trim();

  const limit = 10;
  const offset = (page - 1) * limit;

  const list = await fetchPokemonList(limit, offset);

  if (search) {
    try {
      const found = await fetchPokemon(search);

      const filtered = list.filter(
        (p) => p.name.toLowerCase() !== found.name.toLowerCase(),
      );

      return (
        <div>
          <ItemGrid listData={[found, ...filtered]}/>
          <Paginator />
        </div>
      );
    } catch (e) {
      return (
        <div>
          <ItemGrid listData={list} />
          <Paginator />
        </div>
      );
    }
  }

  return (
    <div>
      <ItemGrid listData={list} />
      <Paginator />
    </div>
  );
}
