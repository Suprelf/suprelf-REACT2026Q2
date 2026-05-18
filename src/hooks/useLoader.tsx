import { useState } from 'react';

export const useLoader = (minTime = 1200) => {
  const [loading, setLoading] = useState(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const run = async <T,>(request: Promise<T>): Promise<T> => {
    setLoading(true);

    const start = Date.now();

    try {
      const result = await request;

      const elapsed = Date.now() - start;
      const remaining = minTime - elapsed;

      if (remaining > 0) {
        await delay(remaining);
      }

      return result;
    } finally {
      setLoading(false);
    }
  };

  return { loading, run };
};
