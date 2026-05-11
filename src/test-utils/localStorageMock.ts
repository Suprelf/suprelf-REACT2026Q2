import { vi } from 'vitest'

export const createLocalStorageMock = () => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] ?? null),

    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),

    clear: vi.fn(() => {
      store = {};
    }),
  };
};