import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Container from './container';

const mockNavigate = vi.fn();
const mockSetSearchParams = vi.fn();
const mockSetLastSearch = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,

    useNavigate: () => mockNavigate,

    useSearchParams: () => [
      new URLSearchParams('page=1'),
      mockSetSearchParams,
    ],

    useParams: () => ({}),

    Outlet: () => <div>Outlet</div>,
  };
});

vi.mock('../../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ['', mockSetLastSearch],
}));

const mockUseMinLoadingQuery = vi.fn();

vi.mock('../../hooks/useMinLoading', () => ({
  useMinLoadingQuery: (...args: unknown[]) =>
    mockUseMinLoadingQuery(...args),
}));

vi.mock('../searchBar/searchBar', () => ({
  default: ({ onSearch }: any) => (
    <button onClick={() => onSearch('pikachu')}>
      Search
    </button>
  ),
}));

vi.mock('../itemGrid/itemGrid', () => ({
  default: ({ listData, onSelect }: any) => (
    <div>
      <div data-testid="items-count">
        {listData.length}
      </div>

      <button
        onClick={() =>
          onSelect({ name: 'pikachu' })
        }
      >
        Select Pokemon
      </button>
    </div>
  ),
}));

vi.mock('../loader/loader', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../flyoutPanel/flyoutPanel', () => ({
  default: () => <div>Flyout</div>,
}));

describe('Container', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseMinLoadingQuery
      .mockReturnValueOnce({
        data: [{ name: 'bulbasaur' }],
        showLoader: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: null,
        showLoader: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: null,
        showLoader: false,
        error: null,
      });
  });

  it('renders pokemon list', () => {
    render(<Container />);

    expect(
      screen.getByTestId('items-count')
    ).toHaveTextContent('1');
  });

  it('handles search', async () => {
    const user = userEvent.setup();

    render(<Container />);

    await user.click(
      screen.getByText('Search')
    );

    expect(mockSetLastSearch).toHaveBeenCalledWith(
      'pikachu'
    );
  });

  it('navigates to details page', async () => {
    const user = userEvent.setup();

    render(<Container />);

    await user.click(
      screen.getByText('Select Pokemon')
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      '/details/pikachu?page=1'
    );
  });

  it('shows loader', () => {
    mockUseMinLoadingQuery
      .mockReset()
      .mockReturnValueOnce({
        data: null,
        showLoader: true,
        error: null,
      })
      .mockReturnValueOnce({
        data: null,
        showLoader: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: null,
        showLoader: false,
        error: null,
      });

    render(<Container />);

    expect(
      screen.getByText('Loading...')
    ).toBeInTheDocument();
  });

  it('shows error message', () => {
    mockUseMinLoadingQuery
      .mockReset()
      .mockReturnValueOnce({
        data: null,
        showLoader: false,
        error: new Error('API error'),
      })
      .mockReturnValueOnce({
        data: null,
        showLoader: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: null,
        showLoader: false,
        error: null,
      });

    render(<Container />);

    expect(
      screen.getByText('API error')
    ).toBeInTheDocument();
  });
});