/**
 * Curvas de animação do site, num lugar só. Antes cada componente declarava
 * a sua cópia; os valores continuam os mesmos.
 *
 * Os mesmos valores existem como tokens CSS em globals.css (--ease-*),
 * para transições escritas em CSS.
 */
export const EASE = {
  /** Saída suave: entra rápido e assenta devagar. A curva padrão do site. */
  out: [0.16, 1, 0.3, 1],
  /** Máscara: acelera e freia nos dois extremos. Usada em recortes que abrem. */
  mask: [0.76, 0, 0.24, 1],
  /** Artesanal: simétrica e calma. Botões e atmosfera. */
  artisan: [0.65, 0, 0.35, 1],
  /** Tinta: bem marcada nos extremos. As letras do TRIUM do topo. */
  ink: [0.85, 0, 0.15, 1],
} as const;

/** As mesmas curvas em sintaxe CSS, para `transition` escrita à mão. */
export const EASE_CSS = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  mask: 'cubic-bezier(0.76, 0, 0.24, 1)',
} as const;
