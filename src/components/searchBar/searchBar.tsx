import { useState } from 'react';
import { Link } from 'react-router-dom';

import './searchBar.css';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import ErrorButton from '../errorButton/errorButton';
import ThemeSwitch from '../themeSwitch/themeSwitch';

type Props = {
  onSearch: (value: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [storedValue, setStoredValue] = useLocalStorage('last', '');
  const [inputValue, setInputValue] = useState(storedValue);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = storedValue.trim();

    if (!trimmed) return;

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
        <Link className="about-link search-button" to="/about">
          About
        </Link>

        <ErrorButton />

        <ThemeSwitch />
      </div>
    </div>
  );
};

export default SearchBar;
