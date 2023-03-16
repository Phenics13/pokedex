import { Dispatch, SetStateAction, FC } from "react";
import { PokemonData } from "../../context/pokemon.context";
import PokemonCard from "../pokemon-card/pokemon-card.component";
import { GetAllPokemons } from "../pokemons-preview/pokemons-preview.component";

import {
  PokemonsList,
  ButtonsContainer,
  LoadPreviousButton,
  LoadMoreButton,
  ButtonSpinner,
} from "../pokemons-preview/pokemons-preview.styles";

type PokemonsLoadPreviewProps = {
  next: string | null;
  previous: string | null;

  pokemons: PokemonData[];
  getAllPokemons: GetAllPokemons;

  isLoadingPrevious: boolean;
  isLoadingMore: boolean;
  setIsLoadingMore: Dispatch<SetStateAction<boolean>>;
  setIsLoadingPrevious: Dispatch<SetStateAction<boolean>>;
};

const PokemonsLoadPreview: FC<PokemonsLoadPreviewProps> = ({
  next,
  previous,
  pokemons,
  getAllPokemons,
  isLoadingMore,
  isLoadingPrevious,
  setIsLoadingMore,
  setIsLoadingPrevious,
}) => {
  return (
    <>
      {pokemons.length ? (
        <PokemonsList>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </PokemonsList>
      ) : (
        <h3 style={{ textAlign: "center" }}>No Pokemons found</h3>
      )}
      <ButtonsContainer>
        {previous && (
          <LoadPreviousButton
            onClick={() => getAllPokemons(previous, setIsLoadingPrevious)}
            disabled={isLoadingPrevious}
          >
            {isLoadingPrevious ? <ButtonSpinner /> : "Load Previous"}
          </LoadPreviousButton>
        )}
        {next && (
          <LoadMoreButton
            onClick={() => getAllPokemons(next, setIsLoadingMore)}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? <ButtonSpinner /> : "Load More"}
          </LoadMoreButton>
        )}
      </ButtonsContainer>
    </>
  );
};

export default PokemonsLoadPreview;
