import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('render Container and child elements inside ErrorBoundary', () => {
    render(<App/>);

    expect(screen.getByText(/make error/i)).toBeInTheDocument();
  });
});