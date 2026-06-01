import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailsPanel from './details';

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(),
}));

import { useOutletContext } from 'react-router-dom';

const mockedUseOutletContext = useOutletContext as unknown as ReturnType<
  typeof vi.fn
>;

describe('DetailsPanel', () => {
  it('shows loader when loading', () => {
    mockedUseOutletContext.mockReturnValue({
      details: null,
      detailsLoading: true,
      handleClose: vi.fn(),
    });

    render(<DetailsPanel />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });


  it('renders pokemon details', () => {
    mockedUseOutletContext.mockReturnValue({
      details: {
        id: 1,
        name: 'pikachu',
        image: 'pikachu.png',
        flavorText: 'electric',
      },
      detailsLoading: false,
      handleClose: vi.fn(),
    });

    render(<DetailsPanel />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'pikachu.png');
  });

  it('calls handleClose when clicking close button', () => {
    const handleClose = vi.fn();

    mockedUseOutletContext.mockReturnValue({
      details: {
        id: 1,
        name: 'pikachu',
        image: 'pikachu.png',
        flavorText: 'electric',
      },
      detailsLoading: false,
      handleClose,
    });

    render(<DetailsPanel />);

    fireEvent.click(screen.getByText('🗙'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
