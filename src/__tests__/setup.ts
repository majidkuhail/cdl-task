import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock Zustand
vi.mock('zustand'); /*
vi.mock('zustand', () => {
  const create = () => {
    const store = {
      getState: vi.fn(),
      setState: vi.fn(),
      subscribe: vi.fn(),
      destroy: vi.fn(),
    };
    return store;
  };

  return {
    create,
    default: create,
  };
});*/

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
