import './details.css';

import Loader from '../loader/loader';
import { useOutletContext } from 'react-router-dom';

type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  flavorText: string;
};

type ContextType = {
  details: PokemonDetails | null;
  detailsLoading: boolean;
  handleClose: () => void;
};

const DetailsPanel = () => {
  const { details, detailsLoading, handleClose } =
    useOutletContext<ContextType>();

  const isLoading = detailsLoading || !details;

  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  if (isLoading) {
    return (
      <aside className="details-panel">
        <Loader />
      </aside>
    );
  }

  return (
    <aside className="details-panel">
      <button className="close-button" onClick={handleClose}>
        🗙
      </button>

      <img className="img-details" src={details.image} alt={details.name} />

      <div>{formatName(details.name)}</div>

      <div>{details.flavorText}</div>
    </aside>
  );
};

export default DetailsPanel;
