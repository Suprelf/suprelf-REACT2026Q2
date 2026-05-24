import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Outlet } from 'react-router-dom';
import './container.css';

import SearchBar from '../searchBar/searchBar';
import ItemGrid from '../itemGrid/itemGrid';
import Loader from '../loader/loader';

import {
  fetchPokemon,
  fetchPokemonList,
  fetchPokemonDetails,
} from '../../services/api';

import type { Pokemon, PokemonDetails } from '../../types/types';

import { useLoader } from '../../hooks/useLoader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import FlyoutPanel from '../flyoutPanel/flyoutPanel';

const Container = () => {
  const navigate = useNavigate();

  const { loading, run } = useLoader(1200);
  const { loading: detailsLoading, run: runDetails } = useLoader(1200);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const selectedName = window.location.pathname.includes('details')
    ? window.location.pathname.split('/').pop()
    : null;

  const [listData, setListData] = useState<Pokemon[]>([]);
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [lastSearch, setLastSearch] = useLocalStorage('last', '');

  useEffect(() => {
    const load = async () => {
      try {
        setPageLoading(true);

        const baseList = await run(fetchPokemonList(limit, offset));

        let finalList = baseList;

        if (lastSearch?.trim()) {
          try {
            const found = await run(fetchPokemon(lastSearch));

            finalList = [
              found,
              ...baseList.filter((p) => p.name !== found.name),
            ];
          } catch {
            setError('Pokemon not found');
          }
        }

        setListData(finalList);
      } catch {
        setError('Failed to load data');
      } finally {
        setPageLoading(false);
      }
    };

    load();
  }, [page, lastSearch]);

  useEffect(() => {
    const loadDetails = async () => {
      if (!selectedName) {
        setDetails(null);
        return;
      }

      try {
        const data = await runDetails(fetchPokemonDetails(selectedName));
        setDetails(data);
      } catch {
        setError('Failed to load details');
      }
    };

    loadDetails();
  }, [selectedName]);

  const handleSearch = async (value: string) => {
    try {
      setError('');
      setIsSearching(true);

      const newPokemon = await run(fetchPokemon(value));

      setListData((prev) => {
        const exists = prev.some((p) => p.name === newPokemon.name);
        return exists ? prev : [newPokemon, ...prev];
      });

      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('page', '1');
        return params;
      });

      setLastSearch(value);
    } catch {
      setError('Pokemon not found');
    } finally {
      setIsSearching(false);
    }
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
    (loading && listData.length === 0) || pageLoading || isSearching;

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}

      {!isLoading && error && <div className="error-message">{error}</div>}

      {!isLoading && (
        <div className="layout">
          <ItemGrid listData={listData} onSelect={handleSelect} />

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

      <FlyoutPanel/>
    </div>
  );
};

export default Container;
