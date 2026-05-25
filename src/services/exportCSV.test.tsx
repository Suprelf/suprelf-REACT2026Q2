import { describe, it, expect, vi, beforeEach } from 'vitest';

import { generatePokemonCSV } from './exportCSV';
import { fetchPokemonDetails } from './api';
import type { Pokemon } from '../types/types';

vi.mock('./api', () => ({
  fetchPokemonDetails: vi.fn(),
}));

describe('generatePokemonCSV', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate and download csv file', async () => {
    vi.mocked(fetchPokemonDetails).mockResolvedValue({
      id: 25,
      flavorText: 'pikachu flavor',
      name: 'pikachu',
      image: 'pikachu.png',
    });

    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('mock-url');

    const revokeObjectURLSpy = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => {});

    const clickMock = vi.fn();

    const anchor = document.createElement('a');

    anchor.click = clickMock;

    vi.spyOn(document, 'createElement').mockReturnValue(anchor);

    const appendChildSpy = vi.spyOn(document.body, 'appendChild');

    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    const data: Pokemon[] = [
      {
        name: 'pikachu',
        image: 'pikachu.png',
        url: 'https://pokeapi.co/api/v2/pokemon/pikachu',
      },
    ];

    await generatePokemonCSV(data);

    expect(fetchPokemonDetails).toHaveBeenCalledWith('pikachu');

    expect(createObjectURLSpy).toHaveBeenCalled();

    expect(clickMock).toHaveBeenCalled();

    expect(appendChildSpy).toHaveBeenCalled();

    expect(removeChildSpy).toHaveBeenCalled();

    expect(revokeObjectURLSpy).toHaveBeenCalledWith('mock-url');
  });
});
