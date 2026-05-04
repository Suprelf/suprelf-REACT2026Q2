import React, { Component } from 'react';
import './container.css';

import SearchBar from '../searchBar/searchBar';
import ItemTable from '../itemTable/itemTable';
import ErrorButton from '../errorButton/errorButton';
import {
  fetchPokemon,
  fetchPokemonList,
  fetchPokemonTerm,
} from '../../services/api';
import type { Pokemon } from '../../types/types';
import Loader from '../loader/loader';

type Props = {};

type State = {
  isLoading: boolean;
  error: string;
  listData: Pokemon[];
};

const loaderDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

class Container extends Component<Props, State> {
  state: State = {
    isLoading: false,
    error: '',
    listData: [],
  };

  runWithLoader = async <T,>(request: Promise<T>): Promise<T> => {
    this.setState({ isLoading: true });

    const start = Date.now();

    try {
      const result = await request;

      const elapsed = Date.now() - start;
      const minTime = 1200;

      if (elapsed < minTime) {
        await loaderDelay(minTime - elapsed);
      }

      return result;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidMount(): Promise<void> {
    try {
      const inputValue = localStorage.getItem('last');

      let data: Pokemon[];

      if (inputValue && inputValue.trim() !== '') {
        try {
          data = await this.runWithLoader(fetchPokemonTerm(inputValue, 9));
        } catch {
          data = await this.runWithLoader(fetchPokemonList());
        }
      } else {
        data = await fetchPokemonList();
      }

      this.setState({ listData: data });
    } catch (e) {
      this.setState({
        error: 'Failed to load data',
      });
    }
  }

  handleAddPokemon = async (value: string) => {
    try {
      this.setState({ isLoading: true, error: '' });

      const newPokemon = await this.runWithLoader(fetchPokemon(value));

      this.setState((prevState) => {
        const exists = prevState.listData.some(
          (p) => p.name === newPokemon.name
        );

        const listData = exists
          ? prevState.listData
          : [newPokemon, ...prevState.listData];

        return {
          listData,
          isLoading: false,
        };
      });
    } catch (e) {
      this.setState({
        error: 'Pokemon not found',
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <SearchBar onSearch={this.handleAddPokemon}></SearchBar>

        {this.state.isLoading && <Loader />}

        {this.state.error && (
          <div className="error-message">{this.state.error}</div>
        )}

        <ItemTable listData={this.state.listData} />

        <ErrorButton />
      </div>
    );
  }
}

export default Container;
