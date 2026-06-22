"use client";

import { useRouter, Link } from "@/i18n/navigation";
import "./searchBar.css";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeSwitch from "../themeSwitch/themeSwitch";
import LocaleSwitch from "../localeSwitch/localeSwitch";

const STORAGE_KEY = "last-search";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState("");

  useEffect(() => {
    const urlSearch = searchParams.get("search");

    if (urlSearch) {
      setValue(urlSearch);
      localStorage.setItem(STORAGE_KEY, urlSearch);
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setValue(saved);
    }
  }, [searchParams]);

  const handleChange = (val: string) => {
    setValue(val);
  };

  const handleSearch = () => {
    const trimmed = value.trim();

    if (!trimmed) return;

    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("search", trimmed);

    localStorage.setItem(STORAGE_KEY, trimmed);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="main-container">
      <div className="search-container">
        <input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
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
