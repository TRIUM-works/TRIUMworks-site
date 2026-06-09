'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

/**
 * "Atmosfera" = o par de cores do fundo liquid-chrome de cada seção. Trocar de
 * seção faz o shader interpolar suavemente entre esses pares (continuidade).
 */
export interface Atmosphere {
  id: string;
  colorA: string;
  colorB: string;
}

// Branco da marca pedido pelo cliente.
const WHITE = '#E8E3D7';
const GREEN = '#09C2A7';
const BLUE = '#0D3B66';

export const ATMOSPHERES: Record<string, Atmosphere> = {
  hero: { id: 'hero', colorA: GREEN, colorB: BLUE }, // verde + azul
  projetos: { id: 'projetos', colorA: GREEN, colorB: WHITE }, // verde + branco
  contato: { id: 'contato', colorA: WHITE, colorB: BLUE }, // branco + azul
};

interface Ctx {
  atmosphere: Atmosphere;
  setAtmosphere: (a: Atmosphere | string) => void;
}

const AtmosphereContext = createContext<Ctx>({
  atmosphere: ATMOSPHERES.hero,
  setAtmosphere: () => {},
});

export function useAtmosphere() {
  return useContext(AtmosphereContext);
}

export function AtmosphereProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [atmosphere, setAtm] = useState<Atmosphere>(ATMOSPHERES.hero);

  const setAtmosphere = useCallback((a: Atmosphere | string) => {
    const next =
      typeof a === 'string' ? ATMOSPHERES[a] ?? ATMOSPHERES.hero : a;
    setAtm((prev) => (prev.id === next.id ? prev : next));
  }, []);

  return (
    <AtmosphereContext.Provider value={{ atmosphere, setAtmosphere }}>
      {children}
    </AtmosphereContext.Provider>
  );
}
