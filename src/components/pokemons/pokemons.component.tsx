import { useContext } from "react";
import { PokemonContext } from "../../context/pokemon.context";

import {
  PokemonPreviewCard,
  PokemonPreviewContainer,
} from "../pokemon-preview/pokemon-preview.styles";
import { PokemonsContainer } from "./pokemons.styles";

import PokemonPreview from "../pokemon-preview/pokemon-preview.component";
import PokemonsPreview from "../pokemons-preview/pokemons-preview.component";

const Pokemons = () => {
  const { chosePokemon } = useContext(PokemonContext);

  document.body.style.overflow =
    document.body.clientWidth <= 480 && chosePokemon ? "hidden" : "unset";

  return (
    <PokemonsContainer>
      <PokemonsPreview />
      {chosePokemon ? (
        <PokemonPreview chosePokemon={chosePokemon} />
      ) : (
        <PokemonPreviewContainer isOpen={document.body.clientWidth > 480}>
          <PokemonPreviewCard>
            <h3>Choose a Pokemon</h3>
          </PokemonPreviewCard>
        </PokemonPreviewContainer>
      )}
    </PokemonsContainer>
  );
};

export default Pokemons;
