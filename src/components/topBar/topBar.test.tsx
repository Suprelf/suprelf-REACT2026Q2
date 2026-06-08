import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopBar from './topBar';

describe('TopBar', () => {
  it('renders both buttons', () => {
    render(
      <TopBar
        onOpenControlled={vi.fn()}
        onOpenUncontrolled={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: "Controlled Form"})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Uncontrolled Form" })).toBeInTheDocument();
  });

  it('calls onOpenControlled on click', async () => {
    const user = userEvent.setup();
    const onOpenControlled = vi.fn();

    render(
      <TopBar
        onOpenControlled={onOpenControlled}
        onOpenUncontrolled={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: "Controlled Form" }));

    expect(onOpenControlled).toHaveBeenCalled();
  });

  it('calls onOpenUncontrolled on click', async () => {
    const user = userEvent.setup();
    const onOpenUncontrolled = vi.fn();

    render(
      <TopBar
        onOpenControlled={vi.fn()}
        onOpenUncontrolled={onOpenUncontrolled}
      />
    );

    await user.click(screen.getByRole('button', { name: /uncontrolled form/i }));

    expect(onOpenUncontrolled).toHaveBeenCalled();
  });
});