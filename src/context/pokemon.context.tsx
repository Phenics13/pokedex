import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type Pokemon = {
  name: string;
  url: string;
};

export type Type = {
  name: string;
  url: string;
};

export type PokemonType = {
  slot: number;
  type: Type;
};

export type Sprites = {
  back_default: string;
  front_default: string;
  other: {
    dream_world: {
      front_default: string;
    };
    home: {
      front_default: string;
      front_shiny: string;
    };

    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
};

export type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonData = {
  id: number;
  name: string;
  stats: Stats[];
  types: PokemonType[];
  weight: number;
  sprites: Sprites;
  moves: [];
};

type PokemonContextType = {
  chosePokemon: PokemonData | null;
  setChosePokemon: Dispatch<SetStateAction<PokemonData | null>>;
};

export const PokemonContext = createContext<PokemonContextType>({
  chosePokemon: null,
  setChosePokemon: () => {},
});

export const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [chosePokemon, setChosePokemon] = useState<PokemonData | null>(null);

  const value = {
    chosePokemon,
    setChosePokemon,
  };
  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
