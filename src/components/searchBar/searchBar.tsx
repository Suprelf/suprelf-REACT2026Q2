'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';


import { useLocalStorage } from '../../hooks/useLocalStorage';

type Props = {
  onSearch: (value: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [storedValue, setStoredValue] = useLocalStorage('last', '');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(storedValue);
  }, [storedValue]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputValue.trim();

    if (!trimmed || trimmed === storedValue) return;

    setStoredValue(trimmed);
    onSearch(trimmed);
  };

  return (
    <div className="main-container">
      <div className="search-container">

        <input
          value={inputValue}
          onChange={handleInput}
          placeholder="Search here"
          className="search-input"
        />

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="app-buttons">
        <Link className="about-link search-button" href="/en/about"> {/*TODO ROUTES*/}
          About
        </Link>

      </div>
    </div>
  );
};

export default SearchBar;