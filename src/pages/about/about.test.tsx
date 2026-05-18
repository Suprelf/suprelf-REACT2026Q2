import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './about';

const renderAbout = () =>
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );

describe('About page', () => {
  it('renders page title', () => {
    renderAbout();

    expect(screen.getByText('About this app')).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    renderAbout();

    const link = screen.getByText('Github');

    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://github.com/Suprelf'
    );
  });

  it('renders RS School course link', () => {
    renderAbout();

    const link = screen.getByText('React Course');

    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://app.rs.school/course/student/dashboard?course=react-2026-q2'
    );
  });

  it('renders navigation link to home', () => {
    renderAbout();

    const link = screen.getByText('Go Home');

    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
