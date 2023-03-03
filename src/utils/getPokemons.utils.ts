import axios from "axios";
import { Pokemon, PokemonData, Type } from "../context/pokemon.context";

type GetPokemons = {
  next: string;
  results: Pokemon[];
};

export const getPokemonData = async (
  pokemonURL: string
): Promise<PokemonData> => {
  return await axios(pokemonURL).then((response) => response.data);
};

export const getPokemonsData = async (
  pokemons: Pokemon[]
): Promise<PokemonData[]> => {
  return await Promise.all(
    pokemons.map(async (pokemon) => {
      return await getPokemonData(pokemon.url);
    })
  );
};

export const getPokemons = async (next: string): Promise<GetPokemons> => {
  return await axios(next).then((response) => response.data);
};

export const getTypes = async (): Promise<Type[]> => {
  return await axios(`https://pokeapi.co/api/v2/type`).then(
    (response) => response.data.results
  );
};
