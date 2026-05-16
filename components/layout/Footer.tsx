'use client';

export function Footer() {
  return (
    <footer
      aria-label="Rodapé"
      className="relative w-full px-6 pb-5 pt-3 md:px-12 md:pb-6"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 font-mono text-tiny tracking-[0.18em] text-stone/60">
        <span className="flex items-center gap-2">
          <span className="text-teal/70">✦</span>
          <a
            href="https://www.instagram.com/triumtech_/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="transition-colors hover:text-teal"
          >
            @triumtech_
          </a>
        </span>
        <span className="hidden italic md:inline font-lora normal-case tracking-normal text-stone/50">
          feito à mão em Volta Redonda, RJ
        </span>
        <span>© {new Date().getFullYear()} TRIUM</span>
      </div>
    </footer>
  );
}
