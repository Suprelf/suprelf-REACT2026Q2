"use client";

import "./searchBar.css";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState("");

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    setValue(search);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="main-container">
      <div className="search-container">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search here"
          className="search-input"
        />

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
}
