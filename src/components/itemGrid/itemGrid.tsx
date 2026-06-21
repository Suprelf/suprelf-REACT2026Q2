"use client";

import "./itemGrid.css";
import type { Pokemon } from "@/types/types";
import ItemCard from "../itemCard/itemCard";
import { useRouter, useParams } from "next/navigation";

type Props = {
  listData: Pokemon[];
};

export default function ItemGrid({ listData }: Props) {
  const router = useRouter();
  const params = useParams();

  const locale = params?.locale ?? "en";

  const handleSelect = (pokemon: Pokemon) => {
    router.push(`/${locale}/pokemon/${pokemon.name}`);
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