import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FlyoutPanel from './flyoutPanel';
import { usePokemonStore } from '../../store/store';
import { generatePokemonCSV } from '../../services/exportCSV';
import type { PokemonStore } from '../../types/types';
import { mockData } from '../../test-utils/tableCorrectDataMock';

vi.mock('../../store/store');
vi.mock('../../services/exportCSV');

const mockClearSelected = vi.fn();
const mockGenerateCSV = vi.fn();

const pokemon = mockData[0];

describe('flyoutPanel', () => {
  it('should not render when no selected pokemons', () => {
    vi.mocked(usePokemonStore).mockImplementation(
      (selector: (state: PokemonStore) => unknown) =>
        selector({
          selectedPokemons: [],
          togglePokemon: vi.fn(),
          isSelected: vi.fn(),
          clearSelected: vi.fn(),
        })
    );

    const { container } = render(<FlyoutPanel />);

    expect(container.firstChild).toBeNull();
  });

  it('should render selected count', () => {
    vi.mocked(usePokemonStore).mockImplementation(
      (selector: (state: PokemonStore) => unknown) =>
        selector({
          selectedPokemons: [pokemon],
          togglePokemon: vi.fn(),
          isSelected: vi.fn(),
          clearSelected: mockClearSelected,
        })
    );

    render(<FlyoutPanel />);

    expect(screen.getByText('Selected: 1')).toBeInTheDocument();
  });

  it('should call clearSelected on click', async () => {
    const user = userEvent.setup();

    vi.mocked(usePokemonStore).mockImplementation(
      (selector: (state: PokemonStore) => unknown) =>
        selector({
          selectedPokemons: [pokemon],
          togglePokemon: vi.fn(),
          isSelected: vi.fn(),
          clearSelected: mockClearSelected,
        })
    );

    render(<FlyoutPanel />);

    await user.click(screen.getByText('Unselect all'));

    expect(mockClearSelected).toHaveBeenCalledTimes(1);
  });

  it('should call generatePokemonCSV on download click', async () => {
    const user = userEvent.setup();

    vi.mocked(usePokemonStore).mockImplementation(
      (selector: (state: PokemonStore) => unknown) =>
        selector({
          selectedPokemons: [pokemon],
          togglePokemon: vi.fn(),
          isSelected: vi.fn(),
          clearSelected: vi.fn(),
        })
    );

    vi.mocked(generatePokemonCSV).mockImplementation(mockGenerateCSV);

    render(<FlyoutPanel />);

    await user.click(screen.getByText('Download CSV'));

    expect(mockGenerateCSV).toHaveBeenCalledTimes(1);
  });
});
