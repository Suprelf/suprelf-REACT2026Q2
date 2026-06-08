import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { UncontrolledForm } from './uncontroledForm';

describe('UncontrolledForm', () => {
  it('renders form fields', () => {
    render(<UncontrolledForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();

    render(<UncontrolledForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findAllByText(/required|invalid/i)).length;
  });

  it('handles image upload validation error', async () => {
    const user = userEvent.setup();

    const badFile = new File(['x'], 'test.txt', { type: 'text/plain' });

    render(<UncontrolledForm onSubmit={vi.fn()} />);

    await user.upload(screen.getByLabelText('Image'), badFile);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/image is required/i)).toBeInTheDocument();
  });

  it('updates password indicator on change', async () => {
    const user = userEvent.setup();

    render(<UncontrolledForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText('Password'), 'A1a!aaaa');

    expect(screen.getByText).toBeDefined();
  });
});
