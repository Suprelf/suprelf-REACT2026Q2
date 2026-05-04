import { Component } from 'react';
import './errorButton.css';

class ErrorButton extends Component {
  state = { isError: false };

  render() {
    if (this.state.isError) {
      throw new Error('Test error');
    }

    return (
      <button
        onClick={() => this.setState({ isError: true })}
        className="error-button"
      >
        Make Error
      </button>
    );
  }
}

export default ErrorButton;
