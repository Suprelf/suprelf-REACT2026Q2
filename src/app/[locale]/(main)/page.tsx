import Link from "next/link";
import ItemGrid from "@/components/itemGrid/itemGrid";
import type { Pokemon } from "@/types/types";
import { fetchPokemonList } from "@/services/api";

import "./container.css";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);

  const limit = 10;
  const offset = (page - 1) * limit;

  const list: Pokemon[] = await fetchPokemonList(limit, offset);

  return (
    <>
      <ItemGrid listData={list} />

      <div className="paginator-buttons">
        <Link
          href={`?page=${Math.max(page - 1, 1)}`}
          className="paginator-button"
        >
          ◀
        </Link>

        <div className="paginator-button">{page}</div>

        <Link href={`?page=${page + 1}`} className="paginator-button">
          ▶
        </Link>
      </div>
    </>
  );
}
