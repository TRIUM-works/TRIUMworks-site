'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'outline' | 'filled' | 'ghost';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: 'button' | 'a';
  href?: string;
  external?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'outline',
      as = 'button',
      href,
      external,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const base =
      'group relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.18em] text-tiny px-6 py-3 transition-all duration-[400ms] ease-artisan overflow-hidden';
    const variants: Record<Variant, string> = {
      outline:
        'border border-teal text-cream hover:text-carbon hover:bg-teal',
      filled:
        'bg-teal text-carbon hover:bg-teal-light',
      ghost:
        'text-cream hover:text-teal',
    };

    const cls = cn(base, variants[variant], className);

    if (as === 'a' && href) {
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          data-cursor="hover"
          className={cls}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        data-cursor="hover"
        className={cls}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
