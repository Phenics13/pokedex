import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon, PokemonData } from "../../context/pokemon.context";
import PokemonCard from "../pokemon-card/pokemon-card.component";
import { PokemonsPreviewContainer } from "./pokemons-preview.styles";

const PokemonsPreview = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  const getPokemonData = (
    pokemonURL: string
  ): Promise<PokemonData> | undefined => {
    try {
      return axios(pokemonURL).then((json) => json.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPokemonImage = (pokemonId: number) => {
    return `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
  };

  useEffect(() => {
    try {
      axios("https://pokeapi.co/api/v2/pokemon/?limit=30&offset=0")
        .then((json) => json.data.results)
        .then((pokemonList) => {
          const pokemonData = pokemonList.map((pokemon: Pokemon) => {
            return getPokemonData(pokemon.url);
          });
          Promise.all(pokemonData).then((pokemonData: PokemonData[]) => {
            pokemonData.map((pokemonDataItem: PokemonData) => {
              pokemonDataItem.imageURL = getPokemonImage(pokemonDataItem.id);
              return pokemonDataItem;
            });
            setPokemons(pokemonData);
          });
        });
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
