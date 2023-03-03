import { FC } from "react";
import { Type } from "../../context/pokemon.context";
import { PokemonSelectContainer } from "./pokemon-select.styles";

type PokemonSelectProps = {
  types: Type[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const PokemonSelect: FC<PokemonSelectProps> = ({ types, onChange }) => {
  return (
    <PokemonSelectContainer onChange={onChange}>
      <option value="all">All</option>
      {types.map((type) => (
        <option key={type.name} value={type.name}>
          {type.name}
        </option>
      ))}
    </PokemonSelectContainer>
  );
};

export default PokemonSelect;
