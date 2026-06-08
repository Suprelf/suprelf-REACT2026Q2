import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from './autocomplete';
import { describe, expect, it, vi } from 'vitest';

describe('Autocomplete', () => {
  const options = ['Ukraine', 'USA', 'Germany'];

  it('renders input with initial value', () => {
    render(
      <Autocomplete value="Ukraine" onChange={vi.fn()} options={options} />
    );

    expect(screen.getByDisplayValue('Ukraine')).toBeInTheDocument();
  });

  it('opens dropdown on focus', async () => {
    render(<Autocomplete value="" onChange={vi.fn()} options={options} />);

    await userEvent.click(screen.getByRole('textbox'));

    expect(screen.getByText('Ukraine')).toBeInTheDocument();
  });

  it('filters options based on input', async () => {
    render(<Autocomplete value="" onChange={vi.fn()} options={options} />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'ger');

    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.queryByText('USA')).not.toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();

    render(<Autocomplete value="" onChange={onChange} options={options} />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'U');

    expect(onChange).toHaveBeenCalled();
  });

  it('selects option on mouse down', async () => {
    const onChange = vi.fn();

    render(<Autocomplete value="" onChange={onChange} options={options} />);

    await userEvent.click(screen.getByRole('textbox'));
    await userEvent.click(screen.getByText('USA'));

    expect(onChange).toHaveBeenCalledWith('USA');
  });
});
