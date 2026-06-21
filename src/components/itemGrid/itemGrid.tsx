"use client";

import "./itemGrid.css";
import type { Pokemon } from "@/types/types";
import ItemCard from "../itemCard/itemCard";

import { useRouter, useSearchParams, useParams } from "next/navigation";

export default function ItemGrid({ listData }: { listData: Pokemon[] }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = (params?.locale as string) ?? "en";
  const page = searchParams.get("page") ?? "1";

  const handleSelect = (pokemon: Pokemon) => {
    router.push(`/${locale}/pokemon/${pokemon.name}?page=${page}`);
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
