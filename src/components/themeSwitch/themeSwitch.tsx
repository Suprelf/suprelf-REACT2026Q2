"use client"

import { useTheme } from '../../hooks/useTheme';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="switch-button">
      {theme === 'light' ? '☽' : '☼'}
    </button>
  );
};

export default ThemeSwitch;
