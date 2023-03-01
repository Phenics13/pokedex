import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "../pokemon-card/pokemon-card.component";
import { PokemonsPreviewContainer } from "./pokemons-preview.styles";

export type Pokemon = {
  name: string;
  url: string;
};

const PokemonsPreview = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  console.log(pokemons);

  useEffect(() => {
    try {
      axios("https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0").then(
        (json) => setPokemons(json.data.results)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <PokemonsPreviewContainer>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </PokemonsPreviewContainer>
  );
};

export default PokemonsPreview;
