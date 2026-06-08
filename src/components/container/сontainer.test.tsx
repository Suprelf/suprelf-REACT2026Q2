import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Container from './container';
import { describe, it, vi, expect } from 'vitest';

describe('Container', () => {
  it('renders TopBar and SubmitList', () => {
    render(
      <Container onOpenControlled={vi.fn()} onOpenUncontrolled={vi.fn()} />
    );

    expect(screen.getByText(/no submissions yet/i)).toBeInTheDocument();
  });

  it('calls onOpenControlled when TopBar button is clicked', async () => {
    const onOpenControlled = vi.fn();
    const onOpenUncontrolled = vi.fn();

    render(
      <Container
        onOpenControlled={onOpenControlled}
        onOpenUncontrolled={onOpenUncontrolled}
      />
    );

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[0]);

    expect(onOpenControlled).toHaveBeenCalled();
  });

  it('calls onOpenUncontrolled when second TopBar button is clicked', async () => {
    const onOpenControlled = vi.fn();
    const onOpenUncontrolled = vi.fn();

    render(
      <Container
        onOpenControlled={onOpenControlled}
        onOpenUncontrolled={onOpenUncontrolled}
      />
    );

    const buttons = screen.getAllByRole('button');

    await userEvent.click(buttons[1]);

    expect(onOpenUncontrolled).toHaveBeenCalled();
  });
});
