'use client';

import { useMediaQuery } from './useMediaQuery';

export function useMobile(breakpoint = 1024): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}
