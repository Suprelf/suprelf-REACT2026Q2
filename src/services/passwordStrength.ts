import type { PasswordStrength } from '../types/types';

export const getPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;

  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (password.length >= 8) score++;

  if (score <= 1) return { score, label: 'Weak' };
  if (score === 2) return { score, label: 'Medium' };
  if (score === 3 || score === 4) return { score, label: 'Strong' };
  return { score, label: 'Very strong' };
};
