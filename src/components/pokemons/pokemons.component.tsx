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
  const { chosePokemon, isOpen } = useContext(PokemonContext);

  document.body.style.overflow =
    document.body.clientWidth <= 425 && isOpen ? "hidden" : "unset";

  return (
    <PokemonsContainer>
      <PokemonsPreview />
      {chosePokemon
        ? isOpen && <PokemonPreview chosePokemon={chosePokemon} />
        : isOpen && (
            <PokemonPreviewContainer>
              <PokemonPreviewCard>
                <h3>Choose a Pokemon</h3>
              </PokemonPreviewCard>
            </PokemonPreviewContainer>
          )}
    </PokemonsContainer>
  );
};

export default Pokemons;
