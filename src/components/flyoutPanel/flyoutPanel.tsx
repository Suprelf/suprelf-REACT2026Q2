"use client";

import "./flyoutPanel.css";
import { usePokemonStore } from "@/store/store";

export default function FlyoutPanel() {
  const selectedPokemons = usePokemonStore((s) => s.selectedPokemons);
  const clearSelected = usePokemonStore((s) => s.clearSelected);

  if (selectedPokemons.length === 0) return null;

  const downloadCSV = async () => {
    const names = selectedPokemons.map((p) => p.name);

    const res = await fetch("/api/export/csv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ names }),
    });

    if (!res.ok) return;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${names.length}_pokemon.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flyout">
      <div>Selected: {selectedPokemons.length}</div>

      <button className="search-button" onClick={clearSelected}>
        Unselect all
      </button>

      <button className="search-button" onClick={downloadCSV}>
        Download CSV
      </button>
    </div>
  );
}