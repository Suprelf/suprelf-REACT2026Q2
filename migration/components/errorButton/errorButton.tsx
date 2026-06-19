import { useState } from 'react';
import './errorButton.css';

const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('Test error');
  }

  return (
    <button onClick={() => setIsError(true)} className="error-button">
      Make Error
    </button>
  );
};

export default ErrorButton;
