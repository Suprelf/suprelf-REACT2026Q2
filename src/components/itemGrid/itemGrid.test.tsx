import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemGrid from './itemGrid';

import { mockData } from '../../test-utils/tableCorrectDataMock';

describe('ItemGrid', () => {
  it('renders list of pokemons', () => {
    render(<ItemGrid listData={mockData} onSelect={vi.fn()} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('renders images with correct alt text', () => {
    render(<ItemGrid listData={mockData} onSelect={vi.fn()} />);

    const images = screen.getAllByRole('img');

    expect(images[0]).toHaveAttribute('src', 'pikachu.png');
    expect(images[0]).toHaveAttribute('alt', 'pikachu');

    expect(images[1]).toHaveAttribute('src', 'bulbasaur.png');
    expect(images[1]).toHaveAttribute('alt', 'bulbasaur');
  });

  it('calls onSelect when item clicked', () => {
    const onSelect = vi.fn();

    render(<ItemGrid listData={mockData} onSelect={onSelect} />);

    const firstItem = screen.getByText('Pikachu');

    fireEvent.click(firstItem);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockData[0]);
  });

  it('formats names correctly', () => {
    render(<ItemGrid listData={mockData} onSelect={vi.fn()} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });
});

