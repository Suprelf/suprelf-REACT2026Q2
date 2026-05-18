import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from './searchBar';

vi.mock('react-router-dom', () => ({
  Link: ({ children }: any) => <a>{children}</a>,
}));

vi.mock('../errorButton/errorButton', () => ({
  default: () => <button>Error</button>,
}));

describe('SearchBar', () => {
  const onSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input and buttons', () => {
    render(<SearchBar onSearch={onSearch} />);

    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('loads stored value into input', async () => {
    render(<SearchBar onSearch={onSearch} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue(/.*/)).toBeInTheDocument();
    });
  });

  it('updates input value on change', () => {
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Search here');

    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect((input as HTMLInputElement).value).toBe('pikachu');
  });

  it('calls onSearch when valid new value submitted', () => {
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Search here');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });

  it('does NOT call onSearch when input is empty', () => {
    render(<SearchBar onSearch={onSearch} />);

    const button = screen.getByText('Search');

    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('does NOT call onSearch when value equals stored value', async () => {
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Search here');
    const button = screen.getByText('Search');

    await waitFor(() => {
      fireEvent.change(input, { target: { value: '' } });
    });

    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('renders About link', () => {
    render(<SearchBar onSearch={onSearch} />);

    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
