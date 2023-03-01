import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Pokemon } from "../pokemons-preview/pokemons-preview.component";
import {
  PokemonCardContainer,
  PokemonCardImage,
  PokemonCardName,
  PokemonCardTypes,
  PokemonCardType,
} from "./pokemon-card.styles";

type PokemonData = {
  id: number;
  name: string;
  sprites: {};
  stats: [];
  types: [];
  weight: number;
};

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard: FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, url } = pokemon;
  const [pokemonData, setPokemonData] = useState<PokemonData>(
    {} as PokemonData
  );

  const getPokemonImage = (pokemonID: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
  };

  useEffect(() => {
    try {
      axios(url).then((json) => {
        console.log(json.data);
        setPokemonData(json.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <PokemonCardContainer>
      {!!Object.keys(pokemonData).length && (
        <>
          <PokemonCardImage
            src={getPokemonImage(pokemonData.id)}
            alt={`pokemon ${name}`}
          />
          <PokemonCardName>{name}</PokemonCardName>
          <PokemonCardTypes>
            {pokemonData.types.map((type: any) => (
              <PokemonCardType key={type.type.name} type={type.type.name}>
                {type.type.name}
              </PokemonCardType>
            ))}
          </PokemonCardTypes>
        </>
      )}
    </PokemonCardContainer>
  );
};

export default PokemonCard;
