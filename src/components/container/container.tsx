import React, { Component } from "react";
import "./container.css";

import SearchBar from "../searchBar/searchBar";
import ItemTable from "../itemTable/itemTable";
import ErrorButton from "../errorButton/errorButton";
import { fetchPokemon, fetchPokemonList, fetchPokemonTerm } from "../../services/api";


type Props = {}

type State = {
  searchTerm: string,
  isLoading: boolean,
  error: string
}

class Container extends Component<Props, State> {
  state: State = {
    searchTerm: "",
    isLoading: false,
    error: "",
  }

  componentDidMount() {
    fetchPokemonList().then(console.log);
    fetchPokemon("pikachu").then(console.log);
    fetchPokemonTerm("pikachu", 9).then(console.log);

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