"use client"

import ItemGrid from "@/components/itemGrid/itemGrid";
import { Pokemon } from "@/types/types";

const MOCK_DATA: Pokemon[] = [
  {
    name: "bulbasaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    url: "test",
  },
  {
    name: "ivysaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    url: "test",
  },
  {
    name: "venusaur",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    url: "test",
  },
  {
    name: "charmander",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    url: "test",
  },
  {
    name: "charmeleon",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    url: "test",
  },
  {
    name: "charizard",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    url: "test",
  }
];

export default function Page() {
  const handleSelect = (pokemon: Pokemon) => {
    console.log("Selected:", pokemon.name);
  };

  return (
    <div>
      <ItemGrid listData={MOCK_DATA} onSelect={handleSelect} />

      <div style={{ marginTop: 20 }}>
        <button disabled>◀</button>
        <span style={{ margin: "0 10px" }}>1</span>
        <button disabled>▶</button>
      </div>
    </div>
  );
}
