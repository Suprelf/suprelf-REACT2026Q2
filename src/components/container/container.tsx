import {
  useNavigate,
  useSearchParams,
  Outlet,
  useParams,
} from 'react-router-dom';
import './container.css';

import SearchBar from '../searchBar/searchBar';
import ItemGrid from '../itemGrid/itemGrid';
import Loader from '../loader/loader';
import FlyoutPanel from '../flyoutPanel/flyoutPanel';

import type { Pokemon } from '../../types/types';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMinLoadingQuery } from '../../hooks/useMinLoading';

import { pokemonKeys } from '../../services/queryKeys';
import {
  fetchPokemon,
  fetchPokemonDetails,
  fetchPokemonList,
} from '../../services/api';

const Container = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const [lastSearch, setLastSearch] = useLocalStorage('last', '');

  const { name: selectedName } = useParams();

  const listQuery = useMinLoadingQuery({
    queryKey: pokemonKeys.list(limit, offset),
    queryFn: () => fetchPokemonList(limit, offset),
  });

  const searchQuery = useMinLoadingQuery({
    queryKey: pokemonKeys.search(lastSearch ?? ''),
    queryFn: () => fetchPokemon(lastSearch),
    enabled: !!lastSearch,
  });

  const detailsQuery = useMinLoadingQuery({
    queryKey: pokemonKeys.details(selectedName ?? ''),
    queryFn: () => fetchPokemonDetails(selectedName ?? ''),
    enabled: !!selectedName,
  });

  const baseList = listQuery.data ?? [];
  const searchPokemon = searchQuery.data;

  const finalList =
    lastSearch?.trim() && searchPokemon
      ? [
          searchPokemon,
          ...baseList.filter((p) => p.name !== searchPokemon.name),
        ]
      : baseList;

  const handleSearch = (value: string) => {
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

  const pageLoading =
    listQuery.showLoader ||
    searchQuery.showLoader;

  const error =
    listQuery.error ||
    searchQuery.error ||
    detailsQuery.error;

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {pageLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      {error && !pageLoading && (
        <div className="error-message">
          {error instanceof Error
            ? error.message
            : 'Something went wrong'}
        </div>
      )}

      {!pageLoading && (
        <div className="layout">
          <ItemGrid
            listData={finalList}
            onSelect={handleSelect}
          />

          <div className="details-slot">
            <Outlet
              context={{
                details: detailsQuery.data,
                detailsLoading: detailsQuery.showLoader,
                handleClose,
              }}
            />
          </div>
        </div>
      )}

      {!pageLoading && (
        <div className="paginator-buttons">
          <button
            className="paginator-button"
            onClick={() =>
              changePage(Math.max(page - 1, 1))
            }
          >
            ◀
          </button>

          <div className="paginator-button">
            {page}
          </div>

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