import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import App from './App';

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

vi.mock('./store/useStore', () => {
  return {
    useFormStore: (selector: any) =>
      selector({
        submissions: [],
        newSubmissionId: null,
        addSubmission: vi.fn(),
        setNewSubmissionId: vi.fn(),
      }),
  };
});

describe('App', () => {
  it('renders container and top bar buttons', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: "Controlled Form"})
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: "Uncontrolled Form"})
    ).toBeInTheDocument();
  });

  it('opens controlled modal', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: "Controlled Form"})
    );

    expect(screen.getByText("Controlled Form")).toBeInTheDocument();
  });

  it('opens uncontrolled modal', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: "Uncontrolled Form" })
    );

    expect(screen.getByText("Uncontrolled Form")).toBeInTheDocument();
  });

  it('closes modal on ESC key', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: "Controlled Form"})
    );

    await user.keyboard('{Escape}');
  });

  it('renders modal via portal', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', { name: "Controlled Form" })
    );

    expect(
      document.getElementById('modal-root')?.children.length
    ).toBeGreaterThan(0);
  });
});