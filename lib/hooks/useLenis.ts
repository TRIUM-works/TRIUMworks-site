'use client';

import { useContext } from 'react';
import { LenisContext } from '@/components/layout/SmoothScrollProvider';

export function useLenis() {
  return useContext(LenisContext);
}
