import './flyoutPanel.css';

import { usePokemonStore } from '../../store/store';
import { generatePokemonCSV } from '../../services/exportCSV';

const FlyoutPanel = () => {
  const selectedPokemons = usePokemonStore((state) => state.selectedPokemons);

  const clearSelected = usePokemonStore((state) => state.clearSelected);

  if (selectedPokemons.length === 0) return null;

  return (
    <div className="flyout">
      <div>Selected: {selectedPokemons.length}</div>

      <button className="search-button" onClick={clearSelected}>
        Unselect all
      </button>

      <button
        className="search-button"
        onClick={() => generatePokemonCSV(selectedPokemons)}
      >
        Download CSV
      </button>
    </div>
  );
};

export default FlyoutPanel;
