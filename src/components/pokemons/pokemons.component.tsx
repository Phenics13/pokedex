import axios from "axios";
import { useEffect, useState } from "react";
import PokemonPreview from "../pokemon-preview/pokemon-preview.component";
import PokemonsPreview from "../pokemons-preview/pokemons-preview.component";
import { PokemonsContainer } from "./pokemons.styles";

const Pokemons = () => {
  return (
    <PokemonsContainer>
      <PokemonsPreview />
      <PokemonPreview />
    </PokemonsContainer>
  );
};

export default Pokemons;
