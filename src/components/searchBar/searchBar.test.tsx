import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLocalStorageMock } from '../../test-utils/localStorageMock';

import SearchBar from './searchBar';

describe('SearchBar component', () => {
  beforeEach(() => {
    const localStorageMock = createLocalStorageMock();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      configurable: true,
    });

    vi.clearAllMocks();
  });

  it('render input and search button', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('load value from localStorage on mount', () => {
    window.localStorage.setItem('last', 'pikachu');

    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('pikachu');
  });

  it('update input value on change', async () => {
    const user = userEvent.setup();

    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'changed');

    expect(input).toHaveValue('changed');
  });

  it('call onSearch with trimmed value', async () => {
    const user = userEvent.setup();

    const mockSearch = vi.fn();

    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.type(input, '  pikachu  ');
    await user.click(button);

    expect(mockSearch).toHaveBeenCalledWith('pikachu');
  });

  it('do not call onSearch if input is empty', async () => {
    const user = userEvent.setup();

    const mockSearch = vi.fn();

    render(<SearchBar onSearch={mockSearch} />);

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.click(button);

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('do not search whitespace input', async () => {
    const user = userEvent.setup();

    const mockSearch = vi.fn();

    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.type(input, '     ');
    await user.click(button);

    expect(mockSearch).not.toHaveBeenCalled();

    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });

  it('do not call onSearch if value == localStorage', async () => {
    window.localStorage.setItem('last', 'pikachu');

    const user = userEvent.setup();

    const mockSearch = vi.fn();

    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.clear(input);
    await user.type(input, 'pikachu');

    await user.click(button);

    expect(mockSearch).not.toHaveBeenCalled();
  });

  it('save value to localStorage on search', async () => {
    const user = userEvent.setup();

    const mockSearch = vi.fn();

    render(<SearchBar onSearch={mockSearch} />);

    const input = screen.getByRole('textbox');

    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.type(input, 'pikachu');
    await user.click(button);

    expect(window.localStorage.setItem).toHaveBeenCalledWith('last', 'pikachu');
  });
});
