import { useState } from 'react';
import { useNavigate, useSearchParams, Outlet } from 'react-router-dom';
import './container.css';

import SearchBar from '../searchBar/searchBar';
import ItemGrid from '../itemGrid/itemGrid';
import Loader from '../loader/loader';

import type { Pokemon } from '../../types/types';

import { useLoader } from '../../hooks/useLoader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import FlyoutPanel from '../flyoutPanel/flyoutPanel';

import { useParams } from 'react-router-dom';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import { usePokemonList } from '../../hooks/usePokemon';
import { usePokemonSearch } from '../../hooks/usePokemonSearch';

const Container = () => {
  const navigate = useNavigate();

  const { loading: loaderLoading } = useLoader(1200);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const [error, setError] = useState('');

  const [lastSearch, setLastSearch] = useLocalStorage('last', '');

  const { name: selectedName } = useParams();

  const { data: details, isLoading: detailsLoading } =
    usePokemonDetails(selectedName ?? '');

  const listQuery = usePokemonList(limit, offset);
  const baseList = listQuery.data ?? [];

  const searchQuery = usePokemonSearch(lastSearch ?? '');
  const searchPokemon = searchQuery.data;

  const finalList =
    lastSearch?.trim() && searchPokemon
      ? [
          searchPokemon,
          ...baseList.filter((p) => p.name !== searchPokemon.name),
        ]
      : baseList;

  const handleSearch = (value: string) => {
    setError('');
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', '1');
      return params;
    });

    setLastSearch(value);
  };

  const handleSelect = (pokemon: Pokemon) => {
    navigate(`/details/${pokemon.name}?page=${page}`);
  };

  const handleClose = () => {
    navigate(`/?page=${page}`);
  };

  const changePage = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', String(newPage));
      return params;
    });
  };

  const isLoading =
    (listQuery.isLoading && baseList.length === 0) ||
    searchQuery.isLoading ||
    loaderLoading;

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      {!isLoading && error && (
        <div className="error-message">{error}</div>
      )}

      {!isLoading && (
        <div className="layout">
          <ItemGrid listData={finalList} onSelect={handleSelect} />

          <div className="details-slot">
            <Outlet context={{ details, detailsLoading, handleClose }} />
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="paginator-buttons">
          <button
            className="paginator-button"
            onClick={() => changePage(Math.max(page - 1, 1))}
          >
            ◀
          </button>

          <div className="paginator-button">{page}</div>

          <button
            className="paginator-button"
            onClick={() => changePage(page + 1)}
          >
            ▶
          </button>
        </div>
      )}

      <FlyoutPanel />
    </div>
  );
};

export default Container;