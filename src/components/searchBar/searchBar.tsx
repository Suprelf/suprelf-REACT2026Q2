"use client";

import { useRouter, Link } from "@/i18n/navigation";
import "./searchBar.css";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeSwitch from "../themeSwitch/themeSwitch";
import LocaleSwitch from "../localeSwitch/localeSwitch";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

    router.push(`/?${params.toString()}`);
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

        <Link className="about-link search-button" href="/about">
          About
        </Link>

        <ThemeSwitch />
        <LocaleSwitch />
      </div>
    </div>
  );
}