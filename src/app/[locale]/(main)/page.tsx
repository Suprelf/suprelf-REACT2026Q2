import ItemGrid from "@/components/itemGrid/itemGrid";
import Paginator from "@/components/paginator/paginator";
import { fetchPokemonList } from "@/services/api";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);

  const limit = 10;
  const offset = (page - 1) * limit;

  const list = await fetchPokemonList(limit, offset);

  return (
    <>
      <ItemGrid listData={list} />
      <Paginator />
    </>
  );
}
