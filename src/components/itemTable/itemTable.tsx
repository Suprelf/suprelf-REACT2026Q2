import { Component } from 'react';
import './itemTable.css';
import type { Pokemon } from '../../types/types';

type Props = {
  listData: Pokemon[];
};

type State = {};

class ItemTable extends Component<Props, State> {
  render() {
    return (
      <div className="table-container">
        <div className="table-item">
          <div className="item-name table-header">Name</div>
          <div className="item-desc table-header">Description</div>
        </div>
        <hr className="hr-header" />

        {this.props.listData.map((pokemon) => (
          <div key={pokemon.name}>
            <div className="table-item" data-testid="pokemon-row">
              <div className="item-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </div>
              <div className="item-desc">{pokemon.url}</div>
            </div>
            <hr className="hr-item" />
          </div>
        ))}
      </div>
    );
  }
}

export default ItemTable;
