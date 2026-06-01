import { Link } from 'react-router-dom';

import './searchBar.css';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import ErrorButton from '../errorButton/errorButton';
import ThemeSwitch from '../themeSwitch/themeSwitch';

import { pokemonKeys } from '../../services/queryKeys';
import RefreshButton from '../refreshButton/refreshButton';

type Props = {
  onSearch: (value: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [storedValue, setStoredValue] = useLocalStorage('last', '');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoredValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = storedValue.trim();

    if (!trimmed) return;

    onSearch(trimmed);
  };

  return (
    <div className="main-container">
      <div className="search-container">
        <RefreshButton queryKey={pokemonKeys.all} />

        <input
          value={storedValue}
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
