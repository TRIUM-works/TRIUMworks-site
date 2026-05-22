'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'outline' | 'filled' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: 'button' | 'a';
  href?: string;
  external?: boolean;
}

/* Quatro spans que percorrem a borda do botão em sequência no hover */
function StrokeBorder() {
  return (
    <>
      <span className="absolute left-0 top-0 h-px w-0 bg-teal transition-[width] duration-200 ease-out group-hover:w-full" />
      <span className="absolute right-0 top-0 h-0 w-px bg-teal transition-[height] duration-200 ease-out delay-[180ms] group-hover:h-full" />
      <span className="absolute bottom-0 right-0 h-px w-0 bg-teal transition-[width] duration-200 ease-out delay-[360ms] group-hover:w-full [transform:scaleX(-1)]" />
      <span className="absolute bottom-0 left-0 h-0 w-px bg-teal transition-[height] duration-200 ease-out delay-[540ms] group-hover:h-full [transform:scaleY(-1)]" />
    </>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'outline', as = 'button', href, external, className, children, ...rest },
    ref
  ) {
    const base =
      'group relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.18em] text-tiny px-6 py-3 transition-all duration-[400ms] ease-artisan overflow-hidden';
    const variants: Record<Variant, string> = {
      outline: 'border border-teal text-cream hover:text-carbon hover:bg-teal',
      filled:  'bg-teal text-carbon hover:bg-teal-light',
      ghost:   'text-cream hover:text-teal',
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
          {variant === 'ghost' && <StrokeBorder />}
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} data-cursor="hover" className={cls} {...rest}>
        {variant === 'ghost' && <StrokeBorder />}
        {children}
      </button>
    );
  }
);
