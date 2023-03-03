import { FC } from "react";
import { PokemonInputContainer } from "./pokemon-input.styles";

type PokemonInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PokemonInput: FC<PokemonInputProps> = ({ value, onChange }) => {
  return (
    <PokemonInputContainer
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search for a Pokemon"
    />
  );
};

export default PokemonInput;
