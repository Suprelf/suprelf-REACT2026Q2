import { useEffect, useState } from 'react';
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
        <Link className="about-link search-button" to="/about">
          About
        </Link>

        <ErrorButton />

        <ThemeSwitch></ThemeSwitch>
      </div>
    </div>
  );
};

export default SearchBar;
