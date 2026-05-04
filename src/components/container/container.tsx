import React, { Component } from "react";
import "./container.css";

import SearchBar from "../searchBar/searchBar";
import ItemTable from "../itemTable/itemTable";
import ErrorButton from "../errorButton/errorButton";


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


  render() {
    return (
      <div className="container">
        <SearchBar></SearchBar>

        <ItemTable/>

        <ErrorButton />
      </div>
    )
  }
}

export default Container;