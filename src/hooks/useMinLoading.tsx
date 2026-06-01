import { useEffect, useRef, useState } from 'react';
import { useQuery, type QueryKey } from '@tanstack/react-query';

type Options<T> = {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
  enabled?: boolean;
  minDelay?: number;
  staleTime?: number;
};

export const useMinLoadingQuery = <T,>({
  queryKey,
  queryFn,
  enabled = true,
  minDelay = 1200,
  staleTime = 60_000,
}: Options<T>) => {
  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime,
  });

  const [showLoader, setShowLoader] = useState(false);

  const startRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const shouldStartLoader =
      query.isFetching &&
      query.fetchStatus === 'fetching' &&
      !query.data;

    if (shouldStartLoader) {
      startRef.current = Date.now();
      setShowLoader(true);
      return;
    }

    if (!query.isFetching && showLoader) {
      const elapsed = startRef.current
        ? Date.now() - startRef.current
        : 0;

      const remaining = Math.max(minDelay - elapsed, 0);

      timeoutRef.current = window.setTimeout(() => {
        setShowLoader(false);
        startRef.current = null;
      }, remaining);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    query.isFetching,
    query.fetchStatus,
    query.data,
    showLoader,
    minDelay,
  ]);

  return {
    ...query,
    showLoader,
  };
};