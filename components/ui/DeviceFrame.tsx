import { cn } from '@/lib/utils';
import { GrainOverlay } from './GrainOverlay';

/**
 * Moldura de navegador — barra com "semáforo" e pílula de URL, conteúdo
 * abaixo. Usada para emoldurar capturas desktop como se fossem o site real
 * rodando no browser.
 */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-blue-deep/50 bg-[#0b0e13] shadow-[0_30px_80px_rgba(0,0,0,0.5)]',
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-blue-deep/40 bg-carbon/90 px-4 py-2.5">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-deep/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal/60" />
        </span>
        {url && (
          <span className="flex min-w-0 flex-1 items-center justify-center gap-2 truncate rounded-md border border-blue-deep/40 bg-blue-deep/10 px-3 py-1 font-mono text-[10px] tracking-[0.08em] text-stone">
            <span aria-hidden="true" className="text-teal/70">
              ⌗
            </span>
            <span className="truncate">{url}</span>
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * Moldura de celular — borda grossa arredondada com "notch". Usada para
 * emoldurar capturas mobile.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2rem] border-[5px] border-[#1b2430] bg-[#0b0e13] shadow-[0_24px_60px_rgba(0,0,0,0.55)]',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-2 z-20 h-1.5 w-14 -translate-x-1/2 rounded-full bg-[#1b2430]"
      />
      <div className="relative">{children}</div>
      <GrainOverlay intensity={0.05} className="rounded-[2rem]" />
    </div>
  );
}
