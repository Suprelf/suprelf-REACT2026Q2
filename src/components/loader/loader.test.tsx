import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './loader';

describe('Loader component', () => {
  it('render loader', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
