import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmitList from './submitList';
import { useFormStore } from '../../store/useStore';

vi.mock('../../store/useStore', () => ({
  useFormStore: vi.fn(),
}));

describe('SubmitList', () => {
  it('renders empty state when no submissions', () => {
    (useFormStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: any) => selector({ submissions: [], newSubmissionId: null })
    );

    render(<SubmitList />);

    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();
  });

  it('renders submissions list', () => {
    (useFormStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: any) =>
        selector({
          submissions: [
            {
              id: '1',
              name: 'John',
              email: 'john@test.com',
              age: 25,
              gender: 'male',
              country: 'USA',
              acceptedTerms: true,
              password: 'Pass123!',
              imageBase64: '',
              createdAt: Date.now(),
            },
          ],
          newSubmissionId: null,
        })
    );

    render(<SubmitList />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
  });

  it('highlights new submission', () => {
    (useFormStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: any) =>
        selector({
          submissions: [
            {
              id: '1',
              name: 'John',
              email: 'john@test.com',
              age: 25,
              gender: 'male',
              country: 'USA',
              acceptedTerms: true,
              password: 'Pass123!',
              imageBase64: '',
              createdAt: Date.now(),
            },
          ],
          newSubmissionId: '1',
        })
    );

    render(<SubmitList />);

    const card = screen.getByText('John').closest('.card');

    expect(card?.className).toContain('card--new');
  });
});
