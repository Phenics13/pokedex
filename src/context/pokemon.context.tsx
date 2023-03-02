import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type Type = {
  name: string;
  url: string;
};

export type PokemonType = {
  slot: number;
  type: Type;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonData = {
  id: number;
  name: string;
  stats: [];
  types: PokemonType[];
  weight: number;
  imageURL: string;
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
