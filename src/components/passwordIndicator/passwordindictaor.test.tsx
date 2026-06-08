import { describe, it, vi, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PasswordIndicator } from './passwordIndicator';
import * as passwordStrength from '../../services/passwordStrength';

describe('PasswordIndicator', () => {
  it('renders strength bar', () => {
    vi.spyOn(passwordStrength, 'getPasswordStrength').mockReturnValue({
      score: 3,
      label: 'Medium',
    });

    render(<PasswordIndicator value="test123" />);

    const fill = document.querySelector('.strength-fill');

    expect(fill).toBeInTheDocument();
  });

  it('sets correct width based on score', () => {
    vi.spyOn(passwordStrength, 'getPasswordStrength').mockReturnValue({
      score: 4,
      label: 'Strong',
    });

    render(<PasswordIndicator value="Test123!" />);

    const fill = document.querySelector('.strength-fill') as HTMLElement;

    expect(fill.style.width).toBe('80%');
  });

  it('applies correct class based on label', () => {
    vi.spyOn(passwordStrength, 'getPasswordStrength').mockReturnValue({
      score: 2,
      label: 'Very strong',
    });

    render(<PasswordIndicator value="Test123!" />);

    const fill = document.querySelector('.strength-fill');

    expect(fill?.className).toContain('very-strong');
  });
});
