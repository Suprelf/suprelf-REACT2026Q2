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

      this.setState({ listData: data }, () => {console.log(this.state.listData)})

    } catch (e) {
      console.error(e)
    }

  }

  handleAddPokemon = async (value: string) => {
    try {
      this.setState({ isLoading: true, error: "" })

      const newPokemon = await fetchPokemon(value)

      this.setState((prevState) => {
        const oldList = prevState.listData.some(
          (p) => p.name === newPokemon.name
        )

        const listData = oldList
          ? prevState.listData
          : [newPokemon, ...prevState.listData];

        return {
          listData,
          isLoading: false,
        }


      }, () => console.log(this.state.listData))
    } catch (e) {
      this.setState({
        error: "Pokemon not found",
        isLoading: false,
      })
    }
   
  }

  render() {
    return (
      <div className="container">
        <SearchBar onSearch={this.handleAddPokemon}></SearchBar>

        <ItemTable />

        <ErrorButton />
      </div>
    )
  }
}

export default Container;