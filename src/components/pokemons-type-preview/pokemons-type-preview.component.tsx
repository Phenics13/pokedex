import { FC, Dispatch, SetStateAction, useState } from "react";
import { PokemonData } from "../../context/pokemon.context";
import PokemonCard from "../pokemon-card/pokemon-card.component";

import {
  PokemonsList,
  ButtonsContainer,
  LoadPreviousButton,
  LoadMoreButton,
} from "../pokemons-preview/pokemons-preview.styles";

type PokemonsTypePreviewProps = {
  pokemons: PokemonData[];
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

const PokemonsTypePreview: FC<PokemonsTypePreviewProps> = ({
  pokemons,
  offset,
  setOffset,
}) => {
  const increaseOffset = () => {
    setOffset((prev) => prev + 12);
  };
  const decreaseOffset = () => {
    setOffset((prev) => prev - 12);
  };

  return (
    <>
      {pokemons.length ? (
        <PokemonsList>
          {pokemons.slice(offset, offset + 12).map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </PokemonsList>
      ) : (
        <h3 style={{ textAlign: "center" }}>No Pokemons found</h3>
      )}
      <ButtonsContainer>
        {offset >= 12 && (
          <LoadPreviousButton onClick={decreaseOffset}>
            Load Previous
          </LoadPreviousButton>
        )}
        {offset < pokemons.length - 12 && (
          <LoadMoreButton onClick={increaseOffset}>Load More</LoadMoreButton>
        )}
      </ButtonsContainer>
    </>
  );
};

export default PokemonsTypePreview;
