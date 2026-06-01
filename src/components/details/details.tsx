import './details.css';

import Loader from '../loader/loader';
import { useOutletContext } from 'react-router-dom';
import type { PokemonDetails } from '../../types/types';

type ContextType = {
  details: PokemonDetails | undefined;
  detailsLoading: boolean;
  handleClose: () => void;
};

const DetailsPanel = () => {
  const { details, detailsLoading, handleClose } =
    useOutletContext<ContextType>();

  const formatName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <aside className="details-panel">
      {detailsLoading && (
        <div className="details-loader">
          <Loader />
        </div>
      )}

      {!detailsLoading && details && (
        <>
          <button className="close-button" onClick={handleClose}>
            🗙
          </button>

          <img className="img-details" src={details.image} alt={details.name} />

          <div>{formatName(details.name)}</div>

          <div>{details.flavorText}</div>
        </>
      )}
    </aside>
  );
};

export default DetailsPanel;
