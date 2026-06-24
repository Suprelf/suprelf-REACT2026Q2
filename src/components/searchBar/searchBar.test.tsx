import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor, render } from '@testing-library/react';
import SearchBar from './searchBar';
import ThemeSwitch from '../themeSwitch/themeSwitch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

// ✅ FIX: partial mock instead of full overwrite
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();

  return {
    ...actual,
    Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  };
});

vi.mock('../errorButton/errorButton', () => ({
  default: () => <button>Error</button>,
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderWithProviders = (ui: React.ReactNode) => {
  const client = createTestQueryClient();

  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('SearchBar', () => {
  const onSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders input and buttons', () => {
    renderWithProviders(<SearchBar onSearch={onSearch} />);

    expect(screen.getByPlaceholderText('Search here')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('loads stored value into input', async () => {
    localStorage.setItem('last', 'pikachu');

    renderWithProviders(<SearchBar onSearch={onSearch} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
    });
  });

  it('updates input value on change', () => {
    renderWithProviders(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Search here');

    fireEvent.change(input, { target: { value: 'pikachu' } });

    expect((input as HTMLInputElement).value).toBe('pikachu');
  });

  it('calls onSearch when valid new value submitted', () => {
    renderWithProviders(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Search here');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });

  it('does NOT call onSearch when input is empty', () => {
    renderWithProviders(<SearchBar onSearch={onSearch} />);

    const button = screen.getByText('Search');

    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('does NOT call onSearch when value equals stored value', () => {
    localStorage.setItem('last', 'pikachu');

    renderWithProviders(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Search here');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('renders About link', () => {
    renderWithProviders(<SearchBar onSearch={onSearch} />);

    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders theme switch button', () => {
    renderWithProviders(<ThemeSwitch />);

    expect(
      screen.queryByText('☽') || screen.queryByText('☼')
    ).toBeInTheDocument();
  });
});
