import axios from "axios";
import { useEffect, useState } from "react";
import PokemonsPreview from "../pokemons-preview/pokemons-preview.component";
import { PokemonsContainer } from "./pokemons.styles";



const Pokemons = () => {

  return (
    <PokemonsContainer>
      <PokemonsPreview/>
    </PokemonsContainer>
  );
};

export default Pokemons;
