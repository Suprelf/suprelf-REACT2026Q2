import React, { Component } from "react";
import "./container.css";

import SearchBar from "../searchBar/searchBar";
import ItemTable from "../itemTable/itemTable";
import ErrorButton from "../errorButton/errorButton";
import { fetchPokemon, fetchPokemonList, fetchPokemonTerm } from "../../services/api";
import type { Pokemon } from "../../types/types";


type Props = {}

type State = {
  isLoading: boolean,
  error: string,
  listData: Pokemon[]
}

class Container extends Component<Props, State> {
  state: State = {
    isLoading: false,
    error: "",
    listData: []
  }

  async componentDidMount(): Promise<void> {
    try {
      const inputValue = localStorage.getItem("last")

      let data

      if (inputValue && inputValue.trim() !== "") {
        data = await fetchPokemonTerm(inputValue, 9)
      } else {
        data = await fetchPokemonList()
      }

      this.setState({ listData: data })
      console.log(data)
    } catch (e) {
      console.error(e)
    }

  }

  render() {
    return (
      <div className="container">
        <SearchBar></SearchBar>

        <ItemTable />

        <ErrorButton />
      </div>
    )
  }
}

export default Container;