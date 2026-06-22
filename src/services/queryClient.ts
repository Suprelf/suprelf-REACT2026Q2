import { QueryClient } from "@tanstack/react-query";

const CACHE_TTL = Number(60000);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TTL,
      gcTime: CACHE_TTL,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
