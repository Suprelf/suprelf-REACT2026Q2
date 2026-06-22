"use client";

import Link from "next/link";
import "./searchBar.css";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeSwitch from "../themeSwitch/themeSwitch";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsRoute = useParams();

  const locale = (paramsRoute?.locale as string) ?? "en";

  const [value, setValue] = useState("");

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    setValue(search);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set("page", "1");

    const trimmed = value.trim();

    if (trimmed) {
      params.set("search", trimmed);
    }

    router.push(`/${locale}?${params.toString()}`);
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

        <Link className="about-link search-button" href={`/${locale}/about`}>
          About
        </Link>

         <ThemeSwitch></ThemeSwitch>
      </div>
    </div>
  );
}
