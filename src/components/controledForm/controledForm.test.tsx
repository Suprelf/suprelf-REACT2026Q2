import { describe, it, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlledForm } from './controledForm';
import { countries } from '../../store/countries';

describe('ControlledForm', () => {
  it('renders all basic fields', () => {
    render(<ControlledForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();

    expect(screen.getByText('Country')).toBeInTheDocument();

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Image')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Accept Terms and Conditions')
    ).toBeInTheDocument();
  });

  it('disables submit when form is invalid', () => {
    render(<ControlledForm onSubmit={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('enables submit when form is valid', async () => {
    const user = userEvent.setup();

    const TEST_COUNTRY = 'Ukraine';

    render(<ControlledForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'john@test.com');

    await user.type(screen.getByLabelText('Password'), 'Password1!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password1!');

    await user.click(screen.getByLabelText('Accept Terms and Conditions'));

    const countryInput = screen.getByPlaceholderText('Select country');

    await user.type(countryInput, TEST_COUNTRY);
    await user.click(screen.getByText(TEST_COUNTRY));

    expect(screen.getByRole('button', { name: 'Submit' }));
  });

  it('calls onSubmit after valid submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    const TEST_COUNTRY = 'Ukraine';

    render(<ControlledForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('Name'), 'John');
    await user.type(screen.getByLabelText('Age'), '25');
    await user.type(screen.getByLabelText('Email'), 'john@test.com');

    await user.type(screen.getByLabelText('Password'), 'Password1!');
    await user.type(screen.getByLabelText('Confirm Password'), 'Password1!');

    await user.click(screen.getByLabelText('Accept Terms and Conditions'));

    const countryInput = screen.getByPlaceholderText('Select country');

    await user.type(countryInput, TEST_COUNTRY);
    await user.click(screen.getByText(TEST_COUNTRY));

    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    await user.upload(screen.getByLabelText('Image'), file);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
