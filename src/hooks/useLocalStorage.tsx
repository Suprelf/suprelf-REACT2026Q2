import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string, initialValue = '') => {
  const [value, setValue] = useState<string>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
};
