import React, { Component } from "react";
import "./loader.css";

type Props = {}

type State = {}

class Loader extends Component<Props, State> {
  render() {
    return (
      <div className="loader-container">
        <div className="spinner" />
      </div>
    );
  }
}

export default Loader