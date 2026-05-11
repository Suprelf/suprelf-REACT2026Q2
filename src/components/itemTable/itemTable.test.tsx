import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { mockData } from '../../test-utils/tableCorrectDataMock';

import ItemTable from './itemTable';

describe('ItemTable', () => {
  it('render headers', () => {
    render(<ItemTable listData={mockData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('render list items with correct capitalized name and correct description value', () => {
    render(<ItemTable listData={mockData} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();

    expect(screen.getByText('https://pokeapi.co/pikachu')).toBeInTheDocument();
    expect(
      screen.getByText('https://pokeapi.co/bulbasaur')
    ).toBeInTheDocument();
  });

  it('render headers but no items when listData is empty', () => {
    render(<ItemTable listData={[]} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();

    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });
});
