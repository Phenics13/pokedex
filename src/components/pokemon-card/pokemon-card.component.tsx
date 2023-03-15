import { FC, useContext } from "react";
import { PokemonData, PokemonContext } from "../../context/pokemon.context";

import {
  PokemonCardContainer,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardTypes,
  PokemonCardType,
} from "./pokemon-card.styles";

type PokemonCardProps = {
  pokemon: PokemonData;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, types, sprites } = pokemon;
  const { setChosePokemon } = useContext(PokemonContext);

  const handleClick = () => {
    setChosePokemon(pokemon);
  };

  return (
    <PokemonCardContainer onClick={handleClick}>
      <PokemonCardImage
        src={sprites.other["official-artwork"].front_default}
        alt={`pokemon ${name}`}
      />
      <PokemonCardName>{name}</PokemonCardName>
      <PokemonCardTypes>
        {types.map((type) => (
          <PokemonCardType key={type.type.name} type={type.type.name}>
            {type.type.name}
          </PokemonCardType>
        ))}
      </PokemonCardTypes>
    </PokemonCardContainer>
  );
};

export default PokemonCard;
