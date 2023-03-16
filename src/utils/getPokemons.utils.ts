import axios from "axios";
import { Pokemon, PokemonData, Type } from "../context/pokemon.context";

export type GetPokemons = {
  next: string;
  previous: string;
  results: Pokemon[];
};

export type GetTypePokemons = {
  pokemon: {
    pokemon: Pokemon;
    slot: number;
  }[];
};
export const getPokemonData = async (
  pokemonURL: string
): Promise<PokemonData> => {
  return axios(pokemonURL).then((response) => response.data);
};

export const getPokemonsData = async (
  pokemons: Pokemon[]
): Promise<PokemonData[]> => {
  return Promise.all(
    pokemons.map(async (pokemon) => {
      return getPokemonData(pokemon.url);
    })
  );
};

export const getPokemons = async (request: string): Promise<GetPokemons> => {
  return axios(request).then((response) => response.data);
};

export const getTypePokemons = async (
  request: string
): Promise<GetTypePokemons> => {
  return axios(request).then((response) => response.data);
};

export const getTypes = async (): Promise<Type[]> => {
  return axios(`https://pokeapi.co/api/v2/type`).then(
    (response) => response.data.results
  );
};
