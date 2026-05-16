import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-blue-deep px-3 py-1 font-mono uppercase tracking-[0.12em] text-[11px] text-stone transition-colors duration-300 hover:border-teal hover:text-teal hover:shadow-[0_0_12px_rgba(9,194,167,0.25)]',
        className
      )}
    >
      {children}
    </span>
  );
}
